import {useState} from 'react'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {YMaps, Map, Placemark} from 'react-yandex-maps'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import useUser from '../../lib/useUser'
import Layout from '../../components/Layout'
import SelectProducts from '../../components/SelectProducts'
import Tags from '../../components/Tags'

const New = () => {
  const {user} = useUser({redirectTo: '/login'})
  const router = useRouter()
  const {register, handleSubmit} = useForm()

  const [selectedOptions, setSelectedOptions] = useState(null)
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState([55.75, 37.57])
  const [placeMark, setPlaceMark] = useState(null)

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' />
  }

  const onHandleClick = async () => {
    if (address) {
      await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=02130a82-c368-4497-b079-9609641139cd&geocode=${address
          .split(' ')
          .join('+')}`
      )
        .then(response => response.json())
        .then(result => {
          const adr =
            result.response.GeoObjectCollection.featureMember[0].GeoObject
              .metaDataProperty.GeocoderMetaData.text
          const coord = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(' ')
            .reverse()
          setCoordinates(coord)
          setPlaceMark(coord)
          setAddress(adr)
        })
    } else NotificationManager.warning('Напишите адрес')
  }

  const onSubmit = async data => {
    if (selectedOptions) {
      if (placeMark) {
        await onHandleClick()
        const products = []
        const classes = []
        selectedOptions.map(value => {
          value.count = data[value.value]
          products.push(value)
          classes.push(value.class)
        })
        const ord = {
          id: user.id,
          email: user.email,
          number: user.number,
          name: user.name,
          lastname: user.lastname,
          avatar: user.avatar ? user.avatar : null,
          products,
          classes,
          address: address,
          coordinates,
          date: data.date,
          status: 'В процессе'
        }

        await fetch('/api/profile/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ord)
        }).then(response => {
          if (response.status === 200) {
            router.push('/profile')
          } else {
            NotificationManager.error('Что-то пошло не так!')
          }
        })
      } else NotificationManager.warning('Поставьте метку')
    } else NotificationManager.warning('Выберете товары')
  }

  return (
    <Layout
      title={user.role === 'farmer' ? 'Выставить товар' : 'Создать заказ'}
    >
      <div className='container'>
        <div className='new'>
          <h1>
            {user.role === 'farmer' ? 'Выставить товар' : 'Создать заказ'}
          </h1>
          <div className='create'>
            <div className='data'>
              {user.role === 'farmer' ? null : (
                <>
                  <h3>Выберите товары</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <SelectProducts onChange={setSelectedOptions} />
                    <Tags data={selectedOptions} register={register} />
                    <div className='geo-date'>
                      <div className='address'>
                        <input
                          type='text'
                          name='address'
                          id='address'
                          placeholder='Адресс'
                          onChange={e => setAddress(e.target.value)}
                          ref={register({
                            required: 'Это поле обязательно к заполнению'
                          })}
                        />
                        <a onClick={onHandleClick}>Поставить метку</a>
                      </div>
                      <input
                        type='date'
                        name='date'
                        id='date'
                        ref={register({
                          required: 'Это поле обязательно к заполнению'
                        })}
                      />
                    </div>
                    <div className='button'>
                      <button type='submit'>Создать заказ</button>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div className='map'>
              <YMaps>
                <div style={{width: '100%', height: '100%'}}>
                  <Map
                    defaultState={{center: coordinates, zoom: 14}}
                    state={{center: coordinates, zoom: 16}}
                    width='100%'
                    height='100%'
                  >
                    {placeMark && <Placemark geometry={placeMark} />}
                  </Map>
                </div>
              </YMaps>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default New

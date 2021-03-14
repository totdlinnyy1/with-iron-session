import {useState} from 'react'
import {useRouter} from 'next/router'
import {YMaps, Map, Placemark} from 'react-yandex-maps'
import {FiEdit2} from 'react-icons/fi'
import dbConnect from '../../utils/dbConnect'
import Order from '../../models/Order'
import useUser from '../../lib/useUser'
import Layout from '../../components/Layout'
import Avatar from '../../components/Avatar'
import OwnOrders from '../../components/OwnOrders'
import BuyerOrders from '../../components/BuyerOrders'

const Profile = ({fetchedOrders}) => {
  const {user} = useUser({redirectTo: '/login'})
  const router = useRouter()

  const [orders] = useState(fetchedOrders ? JSON.parse(fetchedOrders) : null)
  const [showPlaceMark, setShowPlaceMark] = useState(null)

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' />
  }

  return (
    <Layout title='Профиль'>
      <div className='container'>
        <div className='profile'>
          <div className='avatar'>
            <Avatar link={user.avatar} />
          </div>
          <div className='data'>
            <div className='name'>
              <h1>{`${user.lastname} ${user.name}`}</h1>
              <FiEdit2 onClick={() => router.push('/profile/edit')} />
            </div>
            <strong>{user.role === 'farmer' ? 'Фермер' : 'Покупатель'}</strong>
          </div>
        </div>
        <div className='orders-block'>
          <div className='map'>
            <YMaps>
              <div style={{width: '100%', height: '100%'}}>
                <Map
                  defaultState={{center: [55.75, 37.57], zoom: 4}}
                  state={{
                    center: showPlaceMark ? showPlaceMark : [55.75, 37.57],
                    zoom: 15
                  }}
                  width='100%'
                  height='100%'
                >
                  {orders &&
                    user.role === 'farmer' &&
                    !showPlaceMark &&
                    orders.map((value, key) => (
                      <Placemark key={key} geometry={value.coordinates} />
                    ))}
                  {showPlaceMark && <Placemark geometry={showPlaceMark} />}
                </Map>
              </div>
            </YMaps>
          </div>
          <div className='list'>
            <div className='title'>
              <h1>
                {user.role === 'farmer' ? 'Список заказов' : 'Список товаров'}
              </h1>
            </div>
            {user.role === 'farmer' && (
              <BuyerOrders
                fetchedOrders={orders}
                handleClick={setShowPlaceMark}
              />
            )}
            <div className='button'>
              <button onClick={() => router.push('/profile/new')}>
                {user.role === 'farmer' ? 'Выставить товар' : 'Создать заказ'}
              </button>
            </div>
          </div>
        </div>
        <div className='user-orders'>
          <OwnOrders role={user.role} id={user.id} />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const fetchedOrders = await Order.find({status: 'В процессе'})
  return {
    props: {
      fetchedOrders: JSON.stringify(fetchedOrders)
    }
  }
}

export default Profile

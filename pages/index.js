import {useRouter} from 'next/router'
import Image from 'next/image'
import Layout from '../components/Layout'

const Home = () => {
  const router = useRouter()
  return (
    <Layout title='Главная'>
      <div className='container'>
        <div className='header'>
          <div className='info'>
            <div className='title'>
              <h1>
                <span>«Мой фермер»</span> - оналйн- сервис для поиска и продажи
                фрмерской продукции.
              </h1>
            </div>
            <div className='statistics'>
              <div className='number'>
                <h3>1000</h3>
                <p>покупателей</p>
              </div>
              <div className='number'>
                <h3>900</h3>
                <p>заказов</p>
              </div>
              <div className='number'>
                <h3>200</h3>
                <p>фермеров</p>
              </div>
            </div>
            <div className='button-group'>
              <button
                className='farmer-button'
                onClick={() => router.push('/farmer-signup')}
              >
                Стать фермером
              </button>
              <button
                className='buyer-button'
                onClick={() => router.push('/buyer-signup')}
              >
                Сделать заказ
              </button>
            </div>
          </div>
          <div className='image'>
            <Image src='/logo.png' width={615} height={515} />
          </div>
        </div>
        <div className='info-block info-block__buyer'>
          <div className='image'>
            <Image src='/farmer.png' width={301} height={603} />
          </div>
          <div className='text'>
            <h1>
              Здесь вы можете приобрести фермерские продукты без посредников!
            </h1>
            <button onClick={() => router.push('/buyer-signup')}>
              Сделать заказ
            </button>
          </div>
        </div>
        <div className='info-block info-block__farmer'>
          <div className='text'>
            <h1>
              Если Вы - фермер, то здесь Вы сможете продать свою продукцию!
            </h1>
            <button onClick={() => router.push('/farmer-signup')}>
              Стать фермером
            </button>
          </div>
          <div className='image'>
            <Image src='/farmer.png' width={301} height={603} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

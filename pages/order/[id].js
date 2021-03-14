import {useState} from 'react'
import {useRouter} from 'next/router'
import useUser from '../../lib/useUser'
import dbConnect from '../../utils/dbConnect'
import Order from '../../models/Order'
import Layout from '../../components/Layout'
import Avatar from '../../components/Avatar'

const ShowOrder = ({fetchedOrder}) => {
  const {user} = useUser({redirectTo: '/login'})
  const router = useRouter()

  const [data, setData] = useState(
    fetchedOrder ? JSON.parse(fetchedOrder) : null
  )

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' />
  }

  const handleClick = async () => {
    const body = {
      orderId: data._id,
      status: 'Принят',
      farmerId: user.id,
      email: user.email,
      number: user.number,
      name: user.name,
      lastname: user.lastname,
      avatar: user.avatar
    }
    await fetch('/api/order/accept', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200) router.push('/profile')
    })
  }

  return (
    <Layout title='Заказ'>
      <div className='container'>
        <div className='show-order'>
          <h1>Заказ</h1>
          <div className='order'>
            <div className='owner'>
              <div className='avatar'>
                <Avatar link={data.avatar} />
              </div>
              <div className='name'>
                <h2>{`${data.lastname} ${data.name}`}</h2>
                <p>
                  Номер телефона: <label>{data.number}</label>
                </p>
              </div>
            </div>
            <div className='products'>
              {data.products.map((product, key) => (
                <p
                  key={key}
                >{`${product.label} ${product.count}${product.amount}`}</p>
              ))}
            </div>
            <div className='date'>
              <p>Дата: {data.date}</p>
            </div>
            <div className='address'>
              <p>Адресс: {data.address}</p>
            </div>
            <div className='button'>
              <button onClick={handleClick}>Принять заказ</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
  const order = await Order.findOne({_id: context.query.id})
  return {
    props: {
      fetchedOrder: JSON.stringify(order)
    }
  }
}

export default ShowOrder

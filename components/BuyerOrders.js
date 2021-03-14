import {useState} from 'react'
import {useRouter} from 'next/router'
import Avatar from './Avatar'

const BuyerOrders = ({fetchedOrders, handleClick}) => {
  const [orders, setOrders] = useState(fetchedOrders ? fetchedOrders : null)

  const router = useRouter()

  const showOrders = () =>
    orders.map((value, key) => (
      <div
        key={key}
        className='order'
        onClick={() => handleClick(value.coordinates)}
      >
        <div className='info'>
          <div className='info__user'>
            <div className='data'>
              <div className='avatar'>
                <Avatar link={value.avatar} />
              </div>
              <div className='name'>
                <p>{`${value.lastname} ${value.name}`}</p>
              </div>
            </div>
            <div className='more'>
              <button
                onClick={() => {
                  router.push(`/order/${value._id}`)
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
          <div className='info__order'>
            {value.products.map((product, key) => (
              <p
                key={key}
              >{`${product.label} ${product.count}${product.amount}`}</p>
            ))}
          </div>
        </div>
      </div>
    ))

  return <div className='orders'>{orders && showOrders()}</div>
}

export default BuyerOrders

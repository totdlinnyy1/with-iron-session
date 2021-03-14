import {useState, useEffect} from 'react'

const OwnOrders = ({role, id}) => {
  const [myOrders, setMyOrders] = useState(null)

  useEffect(() => {
    fetch('/api/profile/get-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
      .then(response => response.json())
      .then(data => setMyOrders(data))
  }, [])

  const orders = () => {
    if (myOrders) {
      return myOrders.map((value, key) => {
        let name = value.products.map(product => {
          return product.label
        })
        name = name.join(' ')
        return (
          <div className='table-row' key={key}>
            <div className='table-data'>{key + 1}</div>
            <div className='table-data'>{name}</div>
            <div className='table-data'>{value.status}</div>
            <div className='table-data'>{value.date}</div>
            <div className='table-data'>
              {value.farmer
                ? `${value.farmer.lastname} ${value.farmer.name}`
                : 'Поиск'}
            </div>
          </div>
        )
      })
    }
    return null
  }

  return (
    <div className='my-orders'>
      <h1>{role === 'farmer' ? 'Мои выставленные товары' : 'Мои заказы'}</h1>
      <div className='orders-table'>
        {role === 'farmer' ? null : (
          <div className='table'>
            <div className='table-header'>
              <div className='header__item'>#</div>
              <div className='header__item'>Заказ</div>
              <div className='header__item'>Статус</div>
              <div className='header__item'>Дата</div>
              <div className='header__item'>Фермер</div>
            </div>
            <div className='table-content'>{orders()}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnOrders

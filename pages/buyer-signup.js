import Image from 'next/image'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'

const BuyerSignUp = () => {
  const user = useUser({redirectTo: '/profile', redirectIfFound: true})

  if (!user.user) {
    return <Layout title='Регистрация' />
  }
  return (
    <Layout title='Регистрация'>
      <div className='login'>
        <div className='info'>
          <h1>Сделать заказ</h1>
          <p>Здесь вы можете приобрести фермерские продукты без посредников!</p>
          <Image src='/farmer.png' width={301} height={603} unsized={false} />
        </div>
        <div className='form'>
          <h1>Регистрация</h1>
          <SignUpForm role='buyer' />
        </div>
      </div>
    </Layout>
  )
}

export default BuyerSignUp

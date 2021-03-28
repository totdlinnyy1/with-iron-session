import Layout from '../components/Layout'
import Image from 'next/image'
import SignUpForm from '../components/SignUpForm'

const FarmerSignup = () => {
  return (
    <Layout title='Регистрация'>
      <div className='login'>
        <div className='info'>
          <h1>Стать фермером</h1>
          <p>Если Вы - фермер, то здесь Вы сможете продать свою продукцию!</p>
          <Image src='/farmer.png' width={301} height={603} unsized={false} />
        </div>
        <div className='form'>
          <h1>Регистрация</h1>
          <SignUpForm role='farmer' />
        </div>
      </div>
    </Layout>
  )
}

export default FarmerSignup

import Image from 'next/image'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <Layout title='Вход'>
      <div className='login'>
        <div className='info'>
          <h1>Приветствуем!</h1>
          <Image src='/logo.png' width={515} height={415} unsized={false} />
        </div>
        <div className='form'>
          <h1>Вход</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  )
}

export default Login

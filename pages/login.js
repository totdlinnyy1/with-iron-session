import Image from 'next/image'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const user = useUser({redirectTo: '/profile', redirectIfFound: true})

  if (!user.user) {
    return <Layout title='Вход' />
  }

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

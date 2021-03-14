import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'

const LoginForm = () => {
  const {mutateUser} = useUser({
    redirectTo: '/profile',
    redirectIfFound: true
  })

  const onSubmit = async e => {
    e.preventDefault()
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }
    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
      )
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <form onSubmit={onSubmit} className='login-form'>
      <p>Email:</p>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        required
      />
      <p>Пароль:</p>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Пароль'
        required
      />
      <button type='submit'>Войти</button>
    </form>
  )
}

export default LoginForm

import {useState} from 'react'
import useUser from '../lib/useUser'
import InputMask from 'react-input-mask'
import {NotificationManager} from 'react-notifications'
import fetchJson from '../lib/fetchJson'

const SignUpForm = ({role}) => {
  const [disabled, setDisabled] = useState(false)

  const {mutateUser} = useUser({
    redirectTo: '/profile',
    redirectIfFound: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      lastname: e.currentTarget.lastname.value,
      number: e.currentTarget.number.value,
      role,
      password: e.currentTarget.password.value
    }

    if (body.password === e.currentTarget.rpassword.value) {
      try {
        await mutateUser(
          fetchJson('/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          })
        )
      } catch (error) {
        console.error('An unexpected error happened:', error)
        setDisabled(false)
      }
    } else {
      setDisabled(false)
      NotificationManager.warning('Пароли не совпадают')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <p>Email:</p>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        disabled={disabled}
      />
      <p>Имя:</p>
      <input type='text' id='name' name='name' placeholder='Имя' />
      <p>Фамилия:</p>
      <input
        type='text'
        id='lastname'
        name='lastname'
        placeholder='Фамилия'
        disabled={disabled}
      />
      <p>Номер телефона:</p>
      <InputMask
        mask='+7 (999)-999-99-99'
        placeholder='Номер телефона'
        formatChars={{9: '[0-9]'}}
        name='number'
        disabled={disabled}
      />
      <p>Пароль:</p>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Пароль'
        disabled={disabled}
      />
      <p>Повторите пароль:</p>
      <input
        type='password'
        id='rpassword'
        name='rpassword'
        placeholder='Повторите пароль'
        disabled={disabled}
      />
      <p className='checkbox'>
        <input type='checkbox' name='privacy' required disabled={disabled} />
        <label htmlFor='privacy'>
          Даю согласие на обработку персональных данных
        </label>
      </p>
      <button type='submit' disabled={disabled}>
        Зарегестрироваться
      </button>
    </form>
  )
}

export default SignUpForm

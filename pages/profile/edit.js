import {useRouter} from 'next/router'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import useUser from '../../lib/useUser'
import {storage} from '../../utils/firebase'
import fetchJson from '../../lib/fetchJson'
import Layout from '../../components/Layout'
import Avatar from '../../components/Avatar'

const Edit = () => {
  const {user, mutateUser} = useUser({redirectTo: '/login'})
  const router = useRouter()

  if (!user || user.isLoggedIn === false) {
    return <Layout title='loading...' />
  }

  const onSubmit = async e => {
    e.preventDefault()
    const body = {
      name: e.currentTarget.name.value,
      lastname: e.currentTarget.lastname.value,
      avatar: e.currentTarget.avatar.files,
      password: e.currentTarget.password.value
    }

    if (body.name || body.lastname || body.avatar.length !== 0) {
      if (body.avatar.length !== 0) {
        const storageRef = storage.ref()
        const file = body.avatar[0]
        const name = user.id + Date.now()
        const metaData = {
          contentType: file.type
        }
        const task = storageRef.child(name).put(file, metaData)
        body['avatar'] = await task
          .then(response => response.ref.getDownloadURL())
          .then(url => {
            return url
          })
      } else body['avatar'] = null
      body['id'] = user.id
      try {
        await mutateUser(
          fetchJson('/api/profile/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          })
        )
        router.push('/profile')
      } catch (error) {
        console.error('An unexpected error happened:', error)
      }
    } else return NotificationManager.warning('Ни одного поля не заполнено!')
  }

  return (
    <Layout title='Изменить профиль'>
      <div className='container'>
        <div className='edit__title'>
          <h1>Редактировать профиль</h1>
        </div>
        <div className='edit'>
          <div className='user-data'>
            <div className='avatar'>
              <Avatar link={user.avatar} />
            </div>
            <h1>{`${user.lastname} ${user.name}`}</h1>
            <h3>{user.role === 'farmer' ? 'Фермер' : 'Покупатель'}</h3>
          </div>
          <div className='form'>
            <form onSubmit={onSubmit}>
              <p>Имя:</p>
              <input type='text' name='name' id='name' placeholder='Имя' />
              <p>Фамилия:</p>
              <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Фамилия'
              />
              <div className='file-upload'>
                <p>Аватар:</p>
                <input
                  type='file'
                  id='avatar'
                  name='avatar'
                  accept='image/jpeg,image/png,image/gif'
                />
              </div>
              <p>Подтвердите пароль:</p>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Пароль'
                required
              />
              <div className='button-container'>
                <button type='submit'>Изменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit

import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const SgProfile = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user || user.isLoggedIn === false) {
    return <Layout>loading...</Layout>
  }

  return (
    <Layout>
      <h2>{user.name}</h2>
      <h2>{user.lastname}</h2>
      <img src={user.avatar} alt='' />
    </Layout>
  )
}

function githubUrl(login) {
  return `https://api.github.com/users/${login}`
}

export default SgProfile

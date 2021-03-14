import {useRef, useState} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {NotificationContainer} from 'react-notifications'
import fetchJson from '../lib/fetchJson'
import useUser from '../lib/useUser'

const Layout = ({title, load, children}) => {
  const router = useRouter()
  const {user, mutateUser} = useUser()
  const [show, setShow] = useState(true)
  const nav = useRef()

  const showNav = () => {
    setShow(!show)
    document.body.style.overflowY = show ? 'hidden' : 'auto'
    nav.current.classList.toggle('open')
  }

  const handleLogout = async () => {
    await fetch('/api/logout')
    router.push('/login')
  }

  return (
    <div className='layout'>
      <Head>
        <title>{title}</title>
      </Head>
      <NotificationContainer />
      <nav className='layout__header'>
        <div className='logo'>
          <Link href='/'>
            <a>
              <Image src='/logo.png' width={150} height={130} unsized={false} />
            </a>
          </Link>
        </div>
        <div className='toggle' ref={nav}>
          <div className='nav-links'>
            <div className='link'>
              <Link href='/'>
                <a>На главную</a>
              </Link>
            </div>
            <div className='link'>
              <Link href='/'>
                <a>О нас</a>
              </Link>
            </div>
            <div className='link'>
              <Link href='/'>
                <a>Продукты</a>
              </Link>
            </div>
            <div className='link'>
              <Link href='/'>
                <a>Фермеры</a>
              </Link>
            </div>
            <div className='link'>
              <Link href='/'>
                <a>Контакты</a>
              </Link>
            </div>
          </div>
          <div className='button-container'>
            {user?.isLoggedIn ? (
              <div className='logout'>
                <button onClick={() => router.push('/profile')}>
                  Личный кабинет
                </button>
                <a
                  href='/api/logout'
                  onClick={async e => {
                    e.preventDefault()
                    await mutateUser(fetchJson('/api/logout'))
                    router.push('/login')
                  }}
                >
                  <p>Выйти</p>
                </a>
              </div>
            ) : (
              <div className='login-button'>
                <button onClick={() => router.push('/login')}>Войти</button>
              </div>
            )}
          </div>
        </div>
        <div className='burger' onClick={showNav}>
          <div className='line1' />
          <div className='line2' />
          <div className='line3' />
        </div>
      </nav>
      <>{children}</>
      <div className='layout__footer'>
        <h1>Подвал</h1>
      </div>
    </div>
  )
}

export default Layout

import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'
import 'react-notifications/lib/notifications.css'
import '../styles/index.sass'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp

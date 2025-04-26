// pages/_app.js
import '@/styles/globals.css'
import CursorFollower from '../components/CursorFollower'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* global shooting-star follower */}
      <CursorFollower />

      {/* rest of your app */}
      <Component {...pageProps} />
    </>
  )
}

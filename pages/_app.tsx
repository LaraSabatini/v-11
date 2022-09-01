// import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useStorage from "../hooks/useStorage"

function MyApp({ Component, pageProps }) {
  const { getItem } = useStorage()
  const logged = getItem("isLoggedIn")
  const router = useRouter()

  useEffect(() => {
    if (logged !== "true") {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])
  return (
    <>{(logged || router.asPath === "/") && <Component {...pageProps} />}</>
  )
}

export default MyApp

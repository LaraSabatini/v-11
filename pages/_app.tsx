import type { AppProps } from "next/app"
import GlobalStyle from "theme/globalStyles"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useStorage from "../hooks/useStorage"

function MyApp({ Component, pageProps }: AppProps) {
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
    <div>
      <GlobalStyle />
      {(logged || router.asPath === "/") && <Component {...pageProps} />}
    </div>
  )
}

export default MyApp

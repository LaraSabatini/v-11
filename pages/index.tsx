import { useRouter } from "next/router"
import Login from "components/Login"
import useStorage from "hooks/useStorage"

function Home() {
  const { getItem } = useStorage()
  const logged = getItem("isLoggedIn")

  const router = useRouter()

  if (logged === "true") {
    router.replace("/home")
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {!logged && <Login />}
    </>
  )
}

export default Home

import { useRouter } from "next/router"
import Login from "components/Login"
import useStorage from "hooks/useStorage"

function Home() {
  const { getItem } = useStorage()
  const logged = getItem("isLoggedIn")

  const router = useRouter()

  if (logged === "true") {
    router.replace("/home?clients=true")
  }

  return <div>{!logged && <Login />}</div>
}

export default Home

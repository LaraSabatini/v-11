import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import AnnotationsProvider from "contexts/Annotations"
import AnnotationsView from "components/Annotations"

function Annotations() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user === null) {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <div>
      {isLoggedIn !== null && (
        <AnnotationsProvider>
          <AnnotationsView />
        </AnnotationsProvider>
      )}
    </div>
  )
}

export default Annotations

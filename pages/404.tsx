import React from "react"
import Link from "next/link"
import { ErrorPage } from "theme/globalComponentStyles"

function ErrorPageView() {
  return (
    <ErrorPage>
      <img src="/logo.png" alt="logo" />
      <div className="text">
        <h1>404 :(</h1>
        <p>La pagina que intentas buscar no existe.</p>
        <Link href="/">Volver al inicio</Link>
      </div>
    </ErrorPage>
  )
}

export default ErrorPageView

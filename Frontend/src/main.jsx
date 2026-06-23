import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter} from "react-router-dom"
import { AuthProvider} from "./sections/AuthContext"
import { ParallaxProvider} from "react-scroll-parallax"
import App from "./App"
import "./index.css"

ReactDOM.createRoot( document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <ParallaxProvider>

        <AuthProvider>
    <App />
  </AuthProvider>

      </ParallaxProvider>

    </BrowserRouter>

  </React.StrictMode>
)
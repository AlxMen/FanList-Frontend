import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Singup from "./pages/Singup"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="singup" element={<Singup />} />
          <Route path="recovery-password" element={<ForgotPassword />} />
          <Route path="recovery-password/:token" element={<NewPassword />} />
          <Route path="confrim/:id" element={<ConfirmAccount />} />

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App

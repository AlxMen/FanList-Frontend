import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import RouteProtect from "./layouts/RouteProtect"

import Login from "./pages/Login"
import Singup from "./pages/Singup"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import Lists from "./pages/Lists"
import NewList from "./pages/NewList"

import { AuthProvaider } from './context/AuthProvaider'
import { ListsProvaider } from "./context/ListsProvaider"



function App() {


  return (

    <BrowserRouter>
      <AuthProvaider>
        <ListsProvaider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="singup" element={<Singup />} />
              <Route path="recovery-password" element={<ForgotPassword />} />
              <Route path="recovery-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />

            </Route>
            <Route path="/list" element={<RouteProtect />}>
              <Route index element={<Lists />} />
              <Route path="new-list" element={<NewList />} />
            </Route>
          </Routes>
        </ListsProvaider>
      </AuthProvaider>
    </BrowserRouter>

  )
}

export default App

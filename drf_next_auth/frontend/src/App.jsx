import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import { SignUp,
  Login,
  Profile,
  ForgotPassword,
  VerifyEmail} from "./screens"
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/otp/verify-email' element={<VerifyEmail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

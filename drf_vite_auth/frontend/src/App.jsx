import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { SignUp,
  Login,
  Profile,
  ForgotPassword,
  VerifyEmail,
  LandingPage,
  ResetPassword,
} from "./screens"

function App() {

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/otp/verify-email' element={<VerifyEmail />} />
          <Route path='/password-reset-confirm/:uid/:token' element={<ResetPassword />} />
          <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

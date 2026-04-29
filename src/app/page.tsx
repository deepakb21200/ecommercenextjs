import LoginPage from '@/components/Login'
import { StoreHome } from '@/components/Home/Home'

import SignupPage from '@/components/Home/SignUp'


function page() {
  return (
   
    <>
  
      <StoreHome/>
          <LoginPage/>
          <SignupPage/>
    </>
  )
}

export default page
import React from 'react'
import SignUp from '../components/SignUp/SignUp';
import { Helmet } from 'react-helmet-async';
const SignInProScereen = () => {
  return (
    <div>
       <Helmet>
          <title>Sign up</title>
        </Helmet>
    <SignUp/>
    </div>
  )
}

export default SignInProScereen;
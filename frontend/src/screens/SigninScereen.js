import React from 'react'
import Signin from '../components/SignIn/Signin';
import { Helmet } from 'react-helmet-async';
const SignInProScereen = () => {
  return (
    <div>
      <Helmet>
          <title>Sign in</title>
        </Helmet>
      <Signin/>
    </div>
  )
}

export default SignInProScereen;


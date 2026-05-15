import { View, Text } from 'react-native'
import React from 'react'
import AuthLayout from 'components/AuthLayout'
import CustomInput from 'components/CustomInput'
import MainButton from 'components/MainButton'
import SocialButton from 'components/SocialButton'
import AuthFooter from 'components/AuthFooter'
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LogIn = () => {
  return (
    <AuthLayout title="Log In" subtitle="Welcome to log-in">
      <CustomInput label="Email" placeholder="Enter your email" />
      <CustomInput label="Password" placeholder="Enter your password" isPassword={true}/>
      <MainButton text={"Log in"}/>
      <View className='flex flex-row justify-center w-full gap-5'>
        <SocialButton text="Apple" color="bg-black" textColor="text-white" icon={<FaApple color='white'/>}/>
        <SocialButton text="Google" color="white" textColor="text-black-100" icon={<FcGoogle />}/>
      </View>
      <AuthFooter message="Not ave an account?" linkText="Register"/>
    </AuthLayout>
  )
}

export default LogIn
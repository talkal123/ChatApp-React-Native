import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AuthLayout from 'components/AuthLayout';
import CustomInput from 'components/CustomInput';
import MainButton from 'components/MainButton';
import SocialButton from 'components/SocialButton';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import AuthFooter from 'components/AuthFooter';
import { registerUser } from 'fetchRequests/userRequests';
import TextValidation from 'components/TextValidation';

const Register = () => {
  const [user, setUser] = useState({ userName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 


  useEffect(() => {
    if (message) {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }
  
    
  }, [message])
  

  const onRegister = async () => {
    try {
      if (user.password !== user.confirmPassword) {
        alert('הסיסמאות לא תואמות');
        return;
      }
      setLoading(true);

      const newUser = {
        userName: user.userName,
        email: user.email,
        password: user.password,
      };

      await registerUser(newUser);
      setMessage("הרישום בוצע בהצלחה!");
      setMessageType("success");

      setLoading(false);
      
    } catch (error) {
      setMessage(error); 
      setMessageType("error");
      console.log('Registration failed:', error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Register" subtitle="Join us now">
      <CustomInput
        label="Name"
        placeholder="Enter your name"
        value={user.userName}
        onChangeText={(text) => setUser({ ...user, userName: text })}
      />
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        isPassword={true}
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      <CustomInput
        label="Confirm Password"
        placeholder="Confirm your password"
        isPassword={true}
        value={user.confirmPassword}
        onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
      />
      <MainButton
        onClick={onRegister}
        text={'Register'}
        loading={loading}
        message={message}
        messageType={messageType}
      />
      <View className="flex w-full flex-row justify-center gap-5">
        <SocialButton
          text="Apple"
          color="bg-black"
          textColor="text-white"
          icon={<FaApple color="white" />}
        />
        <SocialButton text="Google" color="white" textColor="text-black-100" icon={<FcGoogle />} />
      </View>
      <AuthFooter message="Have an account?" linkText="Log In" />
    </AuthLayout>
  );
};

export default Register;

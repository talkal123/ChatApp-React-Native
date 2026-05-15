
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useState } from 'react';
import Register from 'pages/Register';
import LogIn from 'pages/LogIn';

export default function App() {
  
  return (
    <SafeAreaProvider >
      <View className='p-5'>
        <Register />
        {/* <LogIn /> */}
      </View>
    </SafeAreaProvider>
  );
}

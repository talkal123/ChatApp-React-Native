import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import TextValidation from './TextValidation';

const MainButton = ({ text,onClick,loading,messageType,message }) => {
  return (
    <View>
  <TouchableOpacity 
    onPress={onClick} 
    disabled={loading} 
    className="rounded-full bg-blue-600 p-5 flex-row justify-center items-center"
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" />
    ) : (
      <Text className="text-center text-white font-semibold">{text}</Text>
    )}
  </TouchableOpacity>
  <View className='flex items-center mt-5'>
    <TextValidation message={message} messageType={messageType}/>
  </View>
  <View className="my-8 flex-row items-center">
    <View className="h-[1px] flex-1 bg-gray-200" />
    <Text className="mx-4 font-medium text-gray-400">Or continue with</Text>
    <View className="h-[1px] flex-1 bg-gray-200" />
  </View>
</View>
  );
};

export default MainButton;

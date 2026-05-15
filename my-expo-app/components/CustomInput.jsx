import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BiHide } from "react-icons/bi";

export default function CustomInput({ label, placeholder,isPassword,value,onChangeText }) {
  
  const [passwordDisplay,setPasswordDisplay] = useState(false)
  

  const isPasswordDisplay = () => {
    setPasswordDisplay(prev => !prev)
  }

  return (
    <View className="mb-4 mt-4 ">
      <Text className="font-semibold mb-2">{label}</Text>
      <View className='flex-row items-center justify-between  w-full relative'>
        <TextInput
          value={value}
          onChangeText={onChangeText} 
          secureTextEntry={passwordDisplay === true ? true : false}
          placeholder={placeholder}
          className="border border-gray-200 p-4 rounded-2xl bg-gray-50 w-full"
        />
        {isPassword && (
            <TouchableOpacity onPress={(isPasswordDisplay)} className='absolute right-5'>
              <BiHide /> 
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}
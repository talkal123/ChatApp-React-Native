import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const SocialButton = ({text, color, textColor,icon}) => {
  return (
    <View className='flex-1'>
      <TouchableOpacity className={`rounded-l-full rounded-r-full ${color} p-5 border border-gray-300 flex flex-row justify-center items-center gap-2`}>
          <View className=''>
          {icon}
        </View>
          <Text className={`text-center ${textColor}`}>{text}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default SocialButton
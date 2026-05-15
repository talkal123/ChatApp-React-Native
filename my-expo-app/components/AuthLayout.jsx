import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from './BackButton'

const AuthLayout = ({title,subtitle,children}) => {
  return (
    <View className='flex flex-col gap-3'>
      <BackButton />
      <Text className='text-xl font-semibold'>{title}</Text>
      <Text className='text-gray-400'>{subtitle}</Text>
      <View>
        {children}
      </View>
    </View>
  )
}

export default AuthLayout
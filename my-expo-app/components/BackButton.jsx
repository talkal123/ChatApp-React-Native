import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({backFunction}) => {
  return (
    <View>
    <TouchableOpacity 
      className='w-8 h-8 border border-gray-200 rounded-full items-center justify-center'
    >
      <IoIosArrowBack />
    </TouchableOpacity>
</View>
  )
}

export default BackButton
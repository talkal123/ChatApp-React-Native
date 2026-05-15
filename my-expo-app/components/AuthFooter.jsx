import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const AuthFooter = ({ message, linkText, onPress }) => {
  return (
    <View className="flex-row justify-center mt-10">
      <Text className="text-gray-500">{message} </Text>
      <TouchableOpacity>
        <Text className="text-blue-600 font-semibold">{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFooter;
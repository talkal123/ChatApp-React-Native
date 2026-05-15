import { View, Text } from 'react-native';
import React from 'react';

const TextValidation = ({ messageType, message }) => {
  return (
    <View>
      {message ? (
        <Text
          className={`mt-4 text-center font-bold ${
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }`}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

export default TextValidation;

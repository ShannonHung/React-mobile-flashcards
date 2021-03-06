import React, {Component} from 'react';
import { white, gray } from '../utils/colors';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
export default function CustomClickButton({
    children,
    onPress,
    btnStyle = {},
    txtStyle = {},
    disabled = false
  }) {
    const disabledButton = disabled ? styles.btnDisabled : {};
    const disabledButtonText = disabled ? styles.btnTextDisabled : {};
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, btnStyle, disabledButton]}
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            style={[
              styles.btnText,
              txtStyle,
              disabledButtonText
            ]}
          >
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    btnContainer: {
      alignItems: 'center',
      marginBottom: 20
    },
    btn: {
      width: 200,
      height: 50,
      backgroundColor: 'red',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#999'
    },
    btnDisabled: {
      backgroundColor: gray,
      borderColor: gray,
    },
    btnText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black'
    },
    btnTextDisabled: {
      color: white
    }
});
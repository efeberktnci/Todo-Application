import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function CustomTextInput({
  label,
  imageSource,
  value,
  style,
  onPressIcon,
  isDate,
  ...rest
}) {
  return (
    <TouchableOpacity
      disabled={onPressIcon ? false : true}
      onPress={() => onPressIcon}>
      <Text style={styles.label}> {label} </Text>
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {},
  inputContainer: {},
  image: {},
});

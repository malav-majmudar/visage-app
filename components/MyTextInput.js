import * as React from "react";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { View } from "react-native";

import {
    Colors,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
} from './styles';

const { brand, darkLight, primary } = Colors;

export default function MyTextInput({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
}

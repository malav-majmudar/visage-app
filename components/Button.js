import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Button({ title, onPress, icon, color, iconFamily }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {iconFamily ? (
        <MaterialCommunityIcons
          name={icon}
          size={28}
          color={color ? color : "#f1f1f1"}
        />
      ) : (
        <MaterialIcons
          name={icon}
          size={28}
          color={color ? color : "#f1f1f1"}
        />
      )}

      <Text
        style={{
          fontSize: 16,
          marginLeft: 0,
          fontWeight: "bold",
          color: color || "#f1f1f1",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 0,
  },
});

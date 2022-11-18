import { useState } from "react";
import React, { Text, TextInput, View, StyleSheet } from "react-native";
import AppColor from "../../../styles/AppColor";
import { CustomSvgIcon, IconName } from "./CustomSvgIcon";

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    paddingBottom: 5,
    color: AppColor.themeFieldLabelColor,
  },
  inputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: AppColor.fieldNotFocused,
    borderRadius: 5,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: AppColor.error,
    fontSize: 14,
  },
});

export const CustomInput = ({
  label,
  error,
  password,
  onFocus = () => {},
  onClearText = () => {},
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [hidePass, setIsHidePass] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[styles.title]}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? AppColor.error
              : isFocus
              ? AppColor.fieldFocused
              : AppColor.fieldNotFocused,
          },
        ]}
      >
        <TextInput
          secureTextEntry={hidePass}
          style={{ flex: 1 }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          {...props}
        />
        {isFocus && (
          <CustomSvgIcon
            name={IconName.IcClose}
            onPress={() => onClearText()}
            style={{
              padding: 10,
            }}
          />
        )}

        {password && isFocus && (
          <CustomSvgIcon
            name={hidePass ? IconName.IcHidePass : IconName.IcShowPass}
            onPress={() => setIsHidePass(!hidePass)}
            style={{
              padding: 10,
            }}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

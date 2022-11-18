import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppColor from "../../styles/AppColor";

import Color from "../../styles/Colors";
import { CustomInput } from "./components/CustomInput";
import { DialogMessage } from "./components/DialogMessage";
import { Loading } from "./components/Loading";
import { PrimaryButton } from "./components/PrimaryButton";
import { errorSelector, isLoadingSelector } from "./redux/loginSelector";
import { verifyOtp } from "./redux/loginSlice";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: AppColor.colorPrimary,
    padding: 16,
    paddingTop: 50,
    height: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: Color.text,
    fontWeight: "600",
  },
});

export default ({ route = {} }) => {
  const params = route.params || {};

  const [otp, setOtp] = useState();
  const loading = useSelector(isLoadingSelector);
  const errorMessage = useSelector(errorSelector);

  const dispatch = useDispatch();

  const onVerifyOtpButtonClick = () => {
    Keyboard.dismiss();
    dispatch(
      verifyOtp({
        uuid: params.userUuid,
        otp,
      })
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DialogMessage message={errorMessage} visible={!!errorMessage} />
        <Loading visible={loading} />
        <CustomInput
          label="Enter OTP sent to your email"
          placeholder="OTP"
          value={otp}
          onClearText={() => setOtp("")}
          onChangeText={(text) => setOtp(text)}
          keyboardType="numeric"
        />

        <PrimaryButton
          title="Verify OTP"
          disabled={!otp}
          onPress={() => {
            onVerifyOtpButtonClick();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

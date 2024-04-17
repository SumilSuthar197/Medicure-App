import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PrimaryButton from "../../../components/PrimaryButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  backgroundColor,
  lightTextColor,
  textBlack,
} from "../../../constants/color";
import { StatusBar } from "expo-status-bar";
import { useDoctorProfile } from "../../../context/DoctorProfileProvider";
const DoctorProfile = () => {
  const { doctorProfile } = useDoctorProfile();
  const snapPoint = useMemo(() => ["22%"], []);
  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const [user, setUser] = useState(doctorProfile);
  const navItems = [
    {
      title: "Your Profile",
      icon: "user-o",
      onPress: () =>
        router.push({
          pathname: "/Doctor/showProfile",
        }),
    },
    {
      title: "Edit Profile",
      icon: "edit",
      onPress: () => router.push("/Doctor/EditProfileDoc"),
    },
    {
      title: "Emergency",
      icon: "h-square",
      onPress: () => router.push("/Doctor/Emergency"),
    },
    {
      title: "Help Center",
      icon: "question-circle-o",
    },
    {
      title: "Privacy Policy",
      icon: "product-hunt",
    },
    {
      title: "Logout",
      icon: "sign-out",
      onPress: handleOpenPress,
    },
  ];

  return (
    <View style={styles.main}>
      <StatusBar style="auto" />
      <ScrollView style={styles.main}>
        <View style={styles.topContainer}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {navItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={item.onPress}>
              <View style={styles.navContainer}>
                <View style={styles.nav1}>
                  <FontAwesome name={item.icon} size={22} color="#777777" />
                  <Text style={styles.navText}>{item.title}</Text>
                </View>
                <FontAwesome name="angle-right" size={24} color="#777777" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheet}
        index={-1}
        snapPoints={snapPoint}
      >
        <Text style={[styles.navText, styles.bottomSheetText]}>
          Are you sure you want to logout?
        </Text>
        <View style={styles.buttonRow}>
          <PrimaryButton
            backgroundColor="#000"
            label="Cancel"
            style={{ width: "47%" }}
            onPress={handleClosePress}
            color="#FFF"
          />
          <PrimaryButton
            backgroundColor="#000"
            label="Yes, Logout"
            style={{ width: "47%" }}
            onPress={async () => {
              await AsyncStorage.removeItem("doctorInfo");
              await AsyncStorage.removeItem("doctorEmail");
              router.replace("/getStarted");
            }}
            color="#FFF"
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: backgroundColor },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    borderRadius: 75,
    width: 120,
    height: 120,
    objectFit: "cover",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 4,
    marginTop: 10,
    color: textBlack,
  },
  email: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#777777",
  },
  navContainer: {
    marginHorizontal: 25,
    paddingVertical: 7,
    borderBottomColor: lightTextColor,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nav1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: lightTextColor,
    marginLeft: 15,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonRow: { flexDirection: "row", paddingHorizontal: 20, gap: 15 },
});

export default DoctorProfile;

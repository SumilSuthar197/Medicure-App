import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PrimaryButton from "../../../components/PrimaryButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backgroundColor, textBlack } from "../../../constants/color";
import axios from "axios";

import { StatusBar } from "expo-status-bar";
import { usePatientProfile } from "../../../context/PatientProfileProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const profile = () => {
  const { patientProfile } = usePatientProfile();
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

  const [user, setUser] = useState(patientProfile.patient);
  const navItems = [
    {
      title: "Your Profile",
      icon: "user-o",
      onPress: () => router.push("/Patient/patientPublicProfile"),
    },
    {
      title: "Edit Profile",
      icon: "edit",
      onPress: () => router.push("/Patient/Profile"),
    },
    {
      title: `Wallet : ${user?.wallet}`,
      icon: "credit-card",
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.main}>
        <StatusBar
          translucent={false}
          style="dark"
          backgroundColor={backgroundColor}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View>
              <Image
                source={{
                  uri:
                    user && user.imageUrl
                      ? user.imageUrl
                      : "https://res.cloudinary.com/deohymauz/image/upload/v1704461039/user1_leoif6.png",
                }}
                style={styles.image}
              />
            </View>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
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
          <View>
            <Text style={[styles.navText, styles.bottomSheetText]}>
              Are you sure you want to logout?
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", paddingHorizontal: 20, gap: 15 }}
          >
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
                await AsyncStorage.removeItem("userInfo");
                router.replace("/getStarted");
              }}
              color="#FFF"
            />
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: backgroundColor },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  image: {
    borderRadius: 75,
    width: 120,
    height: 120,
    objectFit: "fill",
  },
  userName: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 4,
    marginTop: 10,
    color: textBlack,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#777777",
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
  navContainer: {
    marginHorizontal: 25,
    paddingVertical: 7,
    borderBottomColor: "#777777",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSheetText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 10,
  },
  nav1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#777777",
    marginLeft: 15,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
export default profile;

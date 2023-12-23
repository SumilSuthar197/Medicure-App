import { CommonActions } from "@react-navigation/native";
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
import {
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PrimaryButton from "../../../components/PrimaryButton";
import { router } from "expo-router";
import { useNavigation } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { backgroundColor, textBlack } from "../../../constants/color";
import axios from "axios";
import { backendUrl } from "../../../constants/URL";
const profile = () => {
  const navigation = useNavigation();
  const snapPoint = useMemo(() => ["25%"], []);
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
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("userInfo");
        const jwtToken = JSON.parse(storedItem);
        const response = await axios.get(`${backendUrl}/patientprofile`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUser({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: backgroundColor }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ position: "relative", width: 120 }}>
            <Image
              source={
                user.imageUrl
                  ? { uri: user.imageUrl }
                  : require("../../../assets/images/user1.png")
              }
              style={{
                borderRadius: 75,
                width: 120,
                height: 120,
                objectFit: "fill",
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "700",
                marginBottom: 4,
                marginTop: 10,
                color: textBlack,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 5,
                color: "#777777",
              }}
            >
              {user.email}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Patient/patientPublicProfile",
                params: {
                  email: user.email,
                },
              })
            }
          >
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <FontAwesome name="user-o" size={22} color="#777777" />
                <Text style={styles.navText}>Your Profile</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Patient/Profile",
                params: {
                  ...user,
                },
              })
            }
          >
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <Feather name="edit" size={22} color="#777777" />
                <Text style={styles.navText}>Edit Profile</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <MaterialIcons name="payment" size={24} color="#777777" />
                <Text style={styles.navText}>Wallet : {user.wallet}</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
          <View style={styles.navContainer}>
            <View style={styles.nav1}>
              <Ionicons
                name="ios-help-circle-outline"
                size={24}
                color="#777777"
              />
              <Text style={styles.navText}>Help Center</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#777777" />
          </View>
          <TouchableOpacity>
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <MaterialIcons name="privacy-tip" size={24} color="#777777" />
                <Text style={styles.navText}>Privacy Policy</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <MaterialIcons name="logout" size={24} color="#777777" />
                <Text style={styles.navText}>Logout</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        index={-1}
        snapPoints={snapPoint}
      >
        <View>
          <Text
            style={[
              styles.navText,
              {
                textAlign: "center",
                fontSize: 18,
                paddingBottom: 20,
                paddingTop: 10,
              },
            ]}
          >
            Are you sure you want to logout?
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, gap: 15 }}>
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
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "getStarted" }],
                })
              );
            }}
            color="#FFF"
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    marginHorizontal: 25,
    paddingVertical: 7,
    borderBottomColor: "#777777",
    flexDirection: "row",
    justifyContent: "space-between",
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

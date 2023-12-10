import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PrimaryButton from "../../../components/PrimaryButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const profile = () => {
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#FFF" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ position: "relative", width: 120 }}>
            <Image
              source={require("../../../assets/images/user1.png")}
              style={{
                borderRadius: 75,
                width: 120,
                height: 120,
                objectFit: "fill",
              }}
            />
            {/* <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: "#246BFD",
              aspectRatio: 1,
              height: 30,
              borderRadius: 75,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 8,
              right: 0,
            }}
          >
            <AntDesign
              name="edit"
              size={18}
              color="black"
              style={{ color: "#FFF" }}
            />
          </TouchableOpacity> */}
            {/* <Button title="Pick Image" onPress={pickImage} /> */}
            {/* <Button title="Upload Image" onPress={uploadImage} /> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "700",
                marginBottom: 4,
                marginTop: 10,
                color: "black",
              }}
            >
              Sumil Suthar
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 5,
                color: "#777777",
              }}
            >
              {"sumil.suthar@gmail.com"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => router.push("/Patient/Profile")}>
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <FontAwesome name="user-o" size={22} color="#777777" />
                <Text style={styles.navText}>Your Profile</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="#777777" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.navContainer}>
              <View style={styles.nav1}>
                <MaterialIcons name="payment" size={24} color="#777777" />
                <Text style={styles.navText}>Payment method</Text>
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
        {/* <View style={styles.form}>
        <View>
          <Text style={styles.textTitle}>Name</Text>
          <TextInput
            placeholder={user.name}
            editable={false}
            style={styles.textContainer}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            keyboardType="email-address"
            placeholder={user.email}
            editable={false}
            style={styles.textContainer}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            placeholder="Your Phone Number"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, number: text })}
            maxLength={10}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            placeholder="Your Password"
            secureTextEntry={true}
            onChangeText={(text) => setUser({ ...user, password: text })}
            style={styles.textContainer}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Create Account"
            onPress={() =>
              router.push({
                pathname: "/Patient/menu",
                params: { ...user },
              })
            }
          />
        </View>
      </View> */}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.8, // Increase shadow opacity
          shadowRadius: 10,
          elevation: 10, // Increase elevation
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
            onPress={handleClosePress} // Corrected function call
            color="#FFF"
          />
          <PrimaryButton
            backgroundColor="#000"
            label="Yes, Logout"
            style={{ width: "47%" }}
            onPress={() => {
              AsyncStorage.removeItem("userInfo");
              router.push("/getStarted");
            }} // Corrected function call
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
    // borderBottomWidth: 1,
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
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     fontFamily: "Poppins-Regular",
//   },
//   form: {
//     flex: 2,
//     paddingHorizontal: 15,
//     rowGap: 20,
//   },
//   textTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 3,
//     marginLeft: 3,
//   },
//   textContainer: {
//     fontSize: 14,
//     fontWeight: "500",
//     // color: "#000",
//     paddingLeft: 12,
//     paddingRight: 12,
//     height: 48,
//     borderRadius: 12,
//     backgroundColor: "#F5F7F8",
//     width: "100%",
//     marginHorizontal: "auto",
//   },
//   itemTitle: {
//     textAlign: "center",
//     fontSize: 28,
//     fontWeight: "800",
//     marginBottom: 5,
//     color: "black",
//     paddingHorizontal: 15,
//   },
//   itemText: {
//     textAlign: "center",
//     marginHorizontal: 35,
//     color: "black",
//     lineHeight: 22,
//     fontSize: 14,
//     paddingHorizontal: 15,
//   },
//   bottomContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 20,
//     paddingVertical: 20,
//   },
// });

export default profile;

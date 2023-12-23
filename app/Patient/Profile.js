import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";
import axios from "axios";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { Picker } from "@react-native-picker/picker";
import { backendUrl } from "../../constants/URL";

const bloodGroups = [
  { label: "Select Blood Group", value: "" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const Profile = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };
  const uploadImage = async (uri) => {
    const formData = new FormData();
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("upload_preset", "medicure");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/deohymauz/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImage(response.data.secure_url);
      setUser({ ...user, imageUrl: response.data.secure_url });
    } catch (e) {
      console.log(e);
    }
  };

  const item = useLocalSearchParams();
  const [user, setUser] = useState({
    gender: "",
    city: "",
    address: "",
    dob: "",
    bloodGroup: "",
    height: "",
    weight: "",
    emergencyContact: "",
    imageUrl: "",
    ...item,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.email === "" ||
      user.gender === "" ||
      user.city === "" ||
      user.address === "" ||
      user.dob === "" ||
      user.bloodGroup === "" ||
      user.height === "" ||
      user.weight === "" ||
      user.emergencyContact === "" ||
      user.imageUrl === ""
    ) {
      Alert.alert("Missing Information", "Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/addpatient`, user);
      if (response.data.msg) {
        router.push("/getStarted");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                : require("../../assets/images/user1.png")
            }
            style={{
              borderRadius: 75,
              width: 120,
              height: 120,
              objectFit: "fill",
            }}
          />
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
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
          <Text style={styles.textTitle}>Height</Text>
          <TextInput
            keyboardType="phone-pad"
            value={user.height}
            placeholder="Enter height in cm"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, height: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Weight</Text>
          <TextInput
            keyboardType="phone-pad"
            value={user.weight}
            placeholder="Enter weight in kg"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, weight: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Address</Text>
          <TextInput
            placeholder="Enter your address"
            numberOfLines={4}
            value={user.address}
            style={styles.textContainer2}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>City</Text>
          <TextInput
            placeholder="Enter your city"
            value={user.city}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, city: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Gender</Text>
          <TouchableOpacity style={styles.textPicker}>
            <Picker
              mode={"dialog"}
              style={styles.textPicker}
              itemStyle={{ fontSize: 14, fontWeight: "600" }}
              selectedValue={user.gender}
              onValueChange={(itemValue) =>
                setUser({ ...user, gender: itemValue })
              }
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textTitle}>bloodGroup</Text>
          <TouchableOpacity style={styles.textPicker}>
            <Picker
              mode={"dialog"}
              style={styles.textPicker}
              itemStyle={{ fontSize: 14, fontWeight: "600" }}
              selectedValue={user.bloodGroup}
              onValueChange={(itemValue) =>
                setUser({ ...user, bloodGroup: itemValue })
              }
            >
              {bloodGroups.map((group, index) => (
                <Picker.Item
                  key={index}
                  label={group.label}
                  value={group.value}
                />
              ))}
            </Picker>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textTitle}>Date of birth</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={user.dob}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, dob: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Emergency Contact</Text>
          <TextInput
            placeholder="Enter your emergency contact number"
            inputMode="numeric"
            maxLength={10}
            value={user.emergencyContact}
            style={styles.textContainer}
            onChangeText={(text) =>
              setUser({ ...user, emergencyContact: text })
            }
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Create Account"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    fontFamily: "Poppins-Regular",
  },
  form: {
    flex: 2,
    paddingHorizontal: 15,
    rowGap: 20,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    marginLeft: 3,
    color: textBlack,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  textContainer2: {
    textAlignVertical: "top",
    fontSize: 14,
    fontWeight: "500",
    padding: 12,
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  textPicker: {
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: whiteText,
    borderColor: borderColor,
    borderWidth: 1,
    color: lightTextColor,
    textDecorationLine: "none",
    width: "100%",
    marginHorizontal: "auto",
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 5,
    color: "black",
    paddingHorizontal: 15,
  },
  itemText: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 22,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
export default Profile;

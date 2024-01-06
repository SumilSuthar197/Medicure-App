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
import { router } from "expo-router";
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
import { backendUrl } from "../../constants/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileDoc = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("doctorEmail");
        const doctorEmail = JSON.parse(storedItem);
        const response = await axios.get(
          `${backendUrl}/get_doctor_email/${doctorEmail}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
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
      setUser({ ...user, image: response.data.secure_url });
    } catch (e) {
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the image. Please try again."
      );
    }
  };
  const [user, setUser] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.email === "" ||
      user.bio === "" ||
      user.experience === "" ||
      user.image === ""
    ) {
      Alert.alert("Missing Information", "Please fill all the fields");
      return;
    }
    try {
      const storedItem = await AsyncStorage.getItem("doctorInfo");
      const jwtToken = JSON.parse(storedItem);
      const response = await axios.post(
        `${backendUrl}/updatedoctor`,
        {
          ...user,
          questions: inputValues,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.data.msg) {
        router.replace("/Doctor/Doctormenu");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [inputs, setInputs] = useState([""]);
  const [inputValues, setInputValues] = useState([]);
  const addInput = () => {
    setInputs([...inputs, ""]);
  };
  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };
  const saveInputs = () => {
    setInputValues([...inputValues, ...inputs]);
    setInputs([""]);
  };
  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user.image
                ? user.image
                : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
            }}
            style={styles.image}
          />
          <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
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
            value={user.name}
            placeholder={user.name}
            editable={false}
            style={styles.textContainer}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            value={user.email}
            keyboardType="email-address"
            placeholder={user.email}
            editable={false}
            style={styles.textContainer}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Bio</Text>
          <TextInput
            value={user.bio}
            placeholder="Enter your bio"
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, bio: text })}
          />
        </View>
        {inputs.map((value, index) => (
          <View key={index}>
            <Text style={styles.textTitle}>Question {index + 1}</Text>
            <TextInput
              key={index}
              value={value.toString()}
              style={styles.textContainer}
              onChangeText={(text) => handleInputChange(text, index)}
              placeholder={`Enter Question ${index + 1}`}
            />
          </View>
        ))}
        <View style={styles.buttonRow}>
          <PrimaryButton
            style={{ width: "47%" }}
            backgroundColor="#000"
            label="Add Input"
            color={whiteText}
            onPress={addInput}
          />
          <PrimaryButton
            style={{ width: "47%" }}
            backgroundColor="#000"
            label="Save Input"
            color={whiteText}
            onPress={saveInputs}
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
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: { position: "relative", width: 120 },
  image: {
    borderRadius: 75,
    width: 120,
    height: 120,
    objectFit: "fill",
  },
  pickImage: {
    backgroundColor: "#246BFD",
    aspectRatio: 1,
    height: 30,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    right: 0,
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
    paddingHorizontal: 12,
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
  buttonRow: { display: "flex", flexDirection: "row", gap: 15 },
});
export default EditProfileDoc;

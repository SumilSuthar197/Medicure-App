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
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { useDoctorProfile } from "../../context/DoctorProfileProvider";
import { updateDoctorProfile } from "../../api/doctor";
import { uploadImageToCloudinary } from "../../api/common";

const EditProfileDoc = () => {
  const { doctorProfile, setDoctorProfile } = useDoctorProfile();
  const [user, setUser] = useState({
    email: "",
    bio: "",
    experience: "",
    patient_duration: "",
    image: "",
    mobile: "",
    ...doctorProfile,
  });
  const [questions, setQuestions] = useState(user?.questions || [""]);

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
    try {
      const { imageUrl } = await uploadImageToCloudinary(uri);
      setUser({ ...user, image: imageUrl });
    } catch (e) {
      console.log(e);
      Alert.alert("Image Upload Failed", "Please try again later.");
    }
  };

  const handleSubmit = async () => {
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
      const { data } = await updateDoctorProfile({ ...user, questions });
      if (data.msg) {
        Alert.alert("Profile Updated", "Your profile has been updated");
        setDoctorProfile((prev) => ({ ...prev, ...user, questions }));
        router.replace("/Doctor/Home");
      } else {
        Alert.alert("Profile Update Failed", "Please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleInputChange = (text, index) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = text;
      return newQuestions;
    });
  };

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user.image
                ? user.image
                : "https://res.cloudinary.com/deohymauz/image/upload/v1704461039/user1_leoif6.png",
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
            placeholder="Enter your name"
            onChangeText={(text) => setUser({ ...user, name: text })}
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
          <Text style={styles.textTitle}>Mobile Number</Text>
          <TextInput
            placeholder="Enter your contact number"
            inputMode="numeric"
            maxLength={10}
            value={user.mobile.toString()}
            style={styles.textContainer}
            onChangeText={(text) => setUser({ ...user, mobile: text })}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Appointment Duration in minutes</Text>
          <TextInput
            placeholder="Enter duration of appointment in minutes"
            inputMode="numeric"
            maxLength={5}
            value={user.patient_duration.toString()}
            style={styles.textContainer}
            onChangeText={(text) =>
              setUser({ ...user, patient_duration: text })
            }
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
        {questions.map((value, index) => (
          <View key={index}>
            <Text style={styles.textTitle}>Question {index + 1}</Text>
            <TextInput
              key={index}
              value={value}
              style={styles.textContainer}
              onChangeText={(text) => handleInputChange(text, index)}
              placeholder={`Enter Question ${index + 1}`}
            />
          </View>
        ))}
        <View style={styles.buttonRow}>
          <PrimaryButton
            backgroundColor="#000"
            label="Add Question"
            color={whiteText}
            onPress={addQuestion}
          />
          <PrimaryButton
            backgroundColor="#000"
            color="#FFF"
            label="Update Profile"
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
    objectFit: "cover",
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
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default EditProfileDoc;

import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import PrimaryButton from "../../components/PrimaryButton";

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
      setImage(result.assets[0].uri);
    }
  };
  const item = useLocalSearchParams();
  const [user, setUser] = useState({ ...item });
  return (
    <ScrollView>
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
              image ? { uri: image } : require("../../assets/images/user1.png")
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
          {/* <Button title="Pick Image" onPress={pickImage} /> */}
          {/* <Button title="Upload Image" onPress={uploadImage} /> */}
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
    color: "#000",
    marginBottom: 3,
    marginLeft: 3,
  },
  textContainer: {
    fontSize: 14,
    fontWeight: "500",
    // color: "#000",
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F7F8",
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

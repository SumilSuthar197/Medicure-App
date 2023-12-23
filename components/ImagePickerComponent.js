import React, { useState, useEffect } from "react";
import { View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const uploadImageToImgBB = async () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please pick an image first");
      return null;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=1957ce19f0bda45dc71a7b1bd860c41e`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const imageUrl = response.data.data.url;
        alert("Image Uploaded Successfully!");
        return imageUrl;
      } else {
        alert("Sorry, there was an issue while uploading the image.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Sorry, there was an issue while uploading the image.");
      return null;
    }
  };

  return { pickImage, uploadImage, image };
};

export default uploadImageToImgBB;

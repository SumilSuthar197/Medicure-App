import { View, Text, SafeAreaView, Alert } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendUrl } from "../../constants/URL";

const showQuestion = () => {
  
  const item = useLocalSearchParams();
  console.log(item);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Question</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default showQuestion;

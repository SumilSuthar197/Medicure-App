import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
} from "../../constants/color";
import { useLocalSearchParams } from "expo-router";
import { backendUrl } from "../../constants/URL";
import DoctorCard from "../../components/HomeComponent/DoctorCard";

const DoctorSearch = () => {
  const [doctorCardData, setDoctorCardData] = useState([]);
  const { containCategory } = useLocalSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (containCategory === "") {
          response = await axios.get(`${backendUrl}/getdoctors`);
          setDoctorCardData(response.data.doctors.reverse());
        } else {
          response = await axios.get(
            `${backendUrl}/get_doctors/${containCategory}`
          );
          setDoctorCardData(response.data.reverse());
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.main}>
      <View style={styles.iconContainer}>
        <Ionicons name="search-outline" size={24} color={borderColor} />
        <TextInput
          placeholder="Search a Doctor"
          placeholderTextColor="#cccdce"
          style={styles.inputText}
          onChangeText={(value) => {
            setSearchTerm(value);
          }}
          onSubmitEditing={(value) => {
            setSearchTerm(value);
          }}
        />
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 18 }}>
          {isLoading === false ? (
            doctorCardData
              .filter((doctor) =>
                searchTerm
                  ? doctor.name
                    ? doctor.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    : false
                  : true
              )
              .map((doctor, index) => <DoctorCard key={index} {...doctor} />)
          ) : (
            <ActivityIndicator size="large" color="#246BFD" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: backgroundColor },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: "#FFF",
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 8,
    marginTop: 5,
    borderRadius: 15,
  },
  inputText: { width: "100%", color: lightTextColor },
});
export default DoctorSearch;

import React, { useEffect, useState } from "react";
import { View, ScrollView, TextInput, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
} from "../../constants/color";
import DoctorCard from "../../components/HomeComponent/DoctorCard";
import { getDoctorsList } from "../../api/patient";

const DoctorSearch = () => {
  const [doctorCardData, setDoctorCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { containCategory } = useLocalSearchParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getDoctorsList(containCategory);
      setDoctorCardData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <>
              {doctorCardData
                .filter((doctor) =>
                  searchTerm
                    ? doctor.name
                      ? doctor.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : false
                    : true
                )
                .map((doctor, index) => (
                  <DoctorCard key={index} {...doctor} />
                ))}
              {doctorCardData.length === 0 && (
                <Text style={styles.notFound}>No doctors found</Text>
              )}
            </>
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
  notFound: {
    textAlign: "center",
    color: lightTextColor,
    marginTop: 12,
    fontSize: 15,
  },
});
export default DoctorSearch;

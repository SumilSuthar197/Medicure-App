import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome5, Zocial, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import {
  backgroundColor,
  borderColor,
  lightBlueColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { router, useLocalSearchParams } from "expo-router";
import { backendUrl } from "../../constants/URL";
import DoctorCard from "../../components/HomeComponent/DoctorCard";

const HospitalSearch = () => {
  const HospitalCard = (data) => {
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/Patient/doctorDetails",
            // params: {
            //   email: data.email,
            //   rating: data.average_rating,
            //   count: data.review_count,
            // },
          });
        }}
      >
        <View
          style={{
            marginVertical: 10,
            padding: 12,
            borderRadius: 15,
            backgroundColor: whiteText,
            borderWidth: 1,
            borderColor: borderColor,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "fill",
                  borderRadius: 99,
                }}
                source={
                  data.image
                    ? { uri: data.image }
                    : require("../../assets/images/Image.png")
                }
                // source={require("../../assets/images/Image.png")}
              />
            </View>
            <View style={{ gap: 3, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: textBlack }}
              >
                {data.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: lightTextColor,
                }}
              >
                {data.city}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/* <AntDesign name="star" size={12} color="yellow" /> */}
              <Text
                style={{
                  color: lightTextColor,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {/* {data.average_rating} ({data.review_count} review) */}
              </Text>
            </View>
            <Text style={{ color: lightTextColor }}>|</Text>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {/* {data.experience} years experience */}
            </Text>
            <Text style={{ color: lightTextColor }}>|</Text>
            <Text
              style={{
                color: lightTextColor,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {/* {data?.hospital[0]?.location
                ? data.hospital[0].location
                : "Mysuru"} */}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [doctorCardData, setDoctorCardData] = useState([]);
  //   const { containCategory } = useLocalSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${backendUrl}/allhospitals`);
        console.log("hello", response.data);
        setDoctorCardData(response.data);
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
          placeholder="Search a Hospital"
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
              // .filter((doctor) =>
              //   locationTerm
              //     ? doctor.Location
              //       ? doctor.Location.toLowerCase().includes(
              //           locationTerm.toLowerCase()
              //         )
              //       : false
              //     : true
              // )
              .map((doctor, index) => <HospitalCard key={index} {...doctor} />)
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
  mainContainer: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 15,
  },
  img: {
    width: 100,
    height: 110,
    objectFit: "fill",
    borderRadius: 15,
  },
  btn: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 32,
    height: 45,
    borderRadius: 15,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
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
export default HospitalSearch;

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Ionicons,
  FontAwesome5,
  Zocial,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
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

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import DoctorCard from "../../components/HomeComponent/DoctorCard";
import PrimaryButton from "../../components/PrimaryButton";

const HospitalSearch = () => {
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
  const HospitalCard = (data) => {
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() => {
          handleOpenPress();
          setHospital(data.name);
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
                <Ionicons name="ios-call" size={14} color={lightTextColor} />
                {data.mobile}
              </Text>
            </View>
            <Text style={{ color: lightTextColor }}>|</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 3,
              }}
            >
              <MaterialIcons name="email" size={14} color={lightTextColor} />
              <Text
                style={{
                  color: lightTextColor,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {data.email}
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
              Karnataka
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [doctorCardData, setDoctorCardData] = useState([]);
  //   const { containCategory } = useLocalSearchParams();
  const [symptoms, setSymptoms] = useState("");
  const [hospital, setHospital] = useState("");

  const handleSubmitSymptoms = async () => {
    try {
      const response = await axios.post(`${backendUrl}/getspeciality`, {
        hospital: hospital,
        symptoms: symptoms,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
  const snapPoint = useMemo(() => ["25%"], []);
  const bottomSheetRef = useRef(null);

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
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 18, flex: 1 }}>
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
        <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 5,
              marginLeft: 3,
              color: textBlack,
            }}
          >
            Enter your Symptoms
          </Text>
          <TextInput
            placeholder="Symptoms"
            style={{
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
              marginBottom: 20,
            }}
            value={symptoms}
            onChange={(text) => setSymptoms(text)}
          />
          <PrimaryButton
            backgroundColor="#000"
            color={whiteText}
            onPress={handleSubmitSymptoms}
            label="search a Doctor"
          />
        </View>
      </BottomSheet>
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

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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import { backendUrl } from "../../constants/URL";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PrimaryButton from "../../components/PrimaryButton";

const HospitalSearch = () => {
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
    return (
      <TouchableOpacity
        onPress={() => {
          handleOpenPress();
          setHospital(data.name);
        }}
      >
        <View style={styles.hospitalCard}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <Image
                style={styles.hospitalImage}
                source={{
                  uri: data.image
                    ? data.image
                    : "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1702994737/g2eobivztu6qbjlvxhbp.jpg",
                }}
              />
            </View>
            <View style={{ gap: 3, justifyContent: "center" }}>
              <Text style={styles.hospitalName}>{data.name}</Text>
              <Text style={styles.hospitalCity}>{data.city}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={styles.subTitleView}>
              <Ionicons name="ios-call" size={14} color={lightTextColor} />
              <Text style={styles.subTitleText}>{data.mobile}</Text>
            </View>
            <Text style={styles.subTitleText}>|</Text>
            <View style={styles.subTitleView}>
              <MaterialIcons name="email" size={14} color={lightTextColor} />
              <Text style={styles.subTitleText}>{data.email}</Text>
            </View>
            <Text style={styles.subTitleText}>|</Text>
            <Text style={styles.subTitleText}>Karnataka</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [hospitalCardData, setHospitalCardData] = useState([]);
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
        setHospitalCardData(response.data);
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
        <View style={styles.scrollView}>
          {isLoading === false ? (
            hospitalCardData
              .filter((hospital) =>
                searchTerm
                  ? hospital.name
                    ? hospital.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    : false
                  : true
              )
              .map((hospital, index) => (
                <HospitalCard key={index} {...hospital} />
              ))
          ) : (
            <ActivityIndicator size="large" color="#246BFD" />
          )}
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheet}
        index={-1}
        snapPoints={snapPoint}
      >
        <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
          <Text style={styles.bottomSheetText}>Enter your Symptoms</Text>
          <TextInput
            placeholder="Symptoms"
            style={styles.bottomSheetInput}
            value={symptoms}
            onChangeText={(text) => setSymptoms(text)}
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
  scrollView: { paddingHorizontal: 18, flex: 1 },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 3,
    color: textBlack,
  },
  bottomSheetInput: {
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
    marginBottom: 20,
  },
  hospitalCard: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: whiteText,
    borderWidth: 1,
    borderColor: borderColor,
  },
  hospitalImage: {
    width: 50,
    height: 50,
    objectFit: "fill",
    borderRadius: 99,
  },
  hospitalName: { fontSize: 16, fontWeight: "600", color: textBlack },
  hospitalCity: {
    fontSize: 14,
    fontWeight: "500",
    color: lightTextColor,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  subTitleView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  subTitleText: {
    color: lightTextColor,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
export default HospitalSearch;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import {
  backgroundColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";
import PrimaryButton from "../../components/PrimaryButton";
import HospitalCard from "../../components/Hospital/HospitalCard";
import { getHospitalList, submitSymptoms } from "../../api/patient";

const HospitalSearch = () => {
  const [hospitalCardData, setHospitalCardData] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [hospital, setHospital] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const snapPoint = useMemo(() => ["25%"], []);
  const bottomSheetRef = useRef(null);
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

  const handleSubmitSymptoms = async () => {
    try {
      if (!symptoms) {
        Alert.alert("Missing Information", "Please enter your symptoms");
        return;
      }
      await submitSymptoms(symptoms, hospital);
      setSymptoms("");
    } catch (error) {
      console.log(error);
    } finally {
      bottomSheetRef.current?.close();
      Alert.alert(
        "No Doctors Available",
        "There are no doctors available for the specified symptoms at the moment. Please try again later."
      );
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await getHospitalList();
      setHospitalCardData(data);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                  <HospitalCard
                    key={index}
                    data={hospital}
                    onPress={() => {
                      handleOpenPress();
                      setHospital(hospital?.name);
                    }}
                  />
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
    </GestureHandlerRootView>
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
});
export default HospitalSearch;

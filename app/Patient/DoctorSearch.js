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

const DoctorCard = ({
  DoctorName,
  Speciality,
  Experience,
  Hospital,
  Location,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/Patient/doctorDetails");
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
              source={require("../../assets/images/Image.png")}
            />
          </View>
          <View style={{ gap: 3, justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: textBlack }}>
              {DoctorName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: lightTextColor,
              }}
            >
              {Speciality}
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
              4.7 (573 review)
            </Text>
          </View>
          <Text style={{ color: lightBlueColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {Experience} years experience
          </Text>
          <Text style={{ color: lightBlueColor }}>|</Text>
          <Text
            style={{
              color: lightTextColor,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {Location}
          </Text>
        </View>
        {/* <TouchableOpacity
            style={{
              backgroundColor: "#dbeafe",
              paddingHorizontal: 32,
              height: 45,
              borderRadius: 15,
              marginTop: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              router.push("/Patient/doctorDetails");
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#246BFD" }}>
              Make Appointment
            </Text>
          </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

// const DoctorCard = ({
//   DoctorName,
//   Speciality,
//   Experience,
//   Hospital,
//   Location,
// }) => {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={{ flexDirection: "row", gap: 20 }}>
//         <View style={{ borderRadius: 15 }}>
//           <Image
//             style={styles.img}
//             source={require("../../assets/images/Image.png")}
//           />
//         </View>
//         <View style={{ flexDirection: "column", gap: 2 }}>
//           <Text style={{ fontSize: 17, fontWeight: "600" }}>{DoctorName}</Text>
//           <View style={{ flexDirection: "row" }}>
//             <Zocial name="persona" size={14} color="#777777" />
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: "400",
//                 color: "#777777",
//                 paddingLeft: 5,
//               }}
//             >
//               {Speciality}
//             </Text>
//           </View>
//           <Text style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}>
//             <AntDesign name="clockcircleo" size={14} color="#777777" />
//             {Experience}+ years experience
//           </Text>
//           <Text style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}>
//             <FontAwesome5 name="building" size={14} color="#777777" />{" "}
//             {Hospital}
//           </Text>
//           <Text style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}>
//             <Ionicons name="ios-location-outline" size={14} color="#777777" />
//             {Location}
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={styles.btn}
//         //   onPress={() => {
//         //     router.push("/Patient/doctorDetails");
//         //   }}
//       >
//         <Text style={{ fontSize: 18, fontWeight: "500", color: "#246BFD" }}>
//           Make Appointment
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
const DoctorSearch = () => {
  const [doctorCardData, setDoctorCardData] = useState([]);
  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/doctor.json?key=8a2c2e20")
      .then((response) => {
        setDoctorCardData(Object.values(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setDoctorCardData(Object.values(DoctorCardData));
        setIsLoading(false);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //   const [locationTerm, setLocationTerm] = useState("");
  return (
    <View style={styles.main}>
      {/* <View style={{ padding: 20, flex: 1, flexDirection: "row", gap: 5 }}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              borderWidth: 0.7,
              borderColor: "#777777",
              padding: 5,
              borderRadius: 8,
            }}
          >
            <Ionicons name="search-outline" size={24} color="#246BFD" />
            <TextInput
              placeholder="search"
              onChangeText={(value) => {
                setSearchTerm(value);
              }}
              onSubmitEditing={(value) => {
                setSearchTerm(value);
              }}
            />
          </View>
          {/* <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#dbeafe",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#246BFD" }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View> 
        </View> */}
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
                  ? doctor.DoctorName
                    ? doctor.DoctorName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
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
export default DoctorSearch;

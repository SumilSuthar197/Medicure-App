import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const DoctorSearch = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <View style={{ padding: 20, flex: 1, flexDirection: "row", gap: 5 }}>
          <View
            style={{
              width: "77%",
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
              //   onChangeText={(value) => {
              //     setSearchValue(Value);
              //   }}
              //   onSubmitEditing={(value) => {
              //     setSearchValue(Value);
              //   }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#dbeafe",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
              //   onPress={onPress}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#246BFD" }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              padding: 12,
              borderRadius: 15,
              // backgroundColor: "F5F7F8",
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View style={{ borderRadius: 15 }}>
                <Image
                  style={{
                    width: 100,
                    height: 110,
                    objectFit: "fill",
                    borderRadius: 15,
                  }}
                  source={require("../../assets/images/Image.png")}
                />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Dr Sarthak Tanpure
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>Dentist</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#dbeafe",
                paddingHorizontal: 32,
                height: 45,
                borderRadius: 15,
                marginTop: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
              //   onPress={() => {
              //     router.push("/Patient/doctorDetails");
              //   }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "500", color: "#246BFD" }}
              >
                Make Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorSearch;

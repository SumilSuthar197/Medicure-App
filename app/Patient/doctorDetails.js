import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { iconItem } from "../../constants/data";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";

const doctorDetails = () => {
  const data = [
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Neurology",
    "Gastroenterology",
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingHorizontal: 23,
            paddingTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20, paddingBottom: 15 }}>
            <View style={{ borderRadius: 15 }}>
              <Image
                style={{
                  width: 100,
                  height: 110,
                  objectFit: "fill",
                  borderRadius: 75,
                }}
                source={require("../../assets/images/Image.png")}
              />
            </View>
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "500", marginBottom: 3 }}
              >
                Dr Sarthak Tanpure
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", marginBottom: 2 }}
              >
                Dentist
              </Text>
              <Text style={{ fontSize: 16 }}>Chembur,Mumbai</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 20,
              paddingBottom: 0,
              borderTopWidth: 1,
              borderTopColor: "#e5e5e5",
            }}
          >
            {iconItem.map((item, index) => (
              <View
                key={index}
                style={{ width: "25%", alignItems: "center", marginBottom: 10 }}
              >
                <View
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: 15,
                    borderRadius: 99,
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop: 4,
                    color: "#246BFD",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: "#777777" }}>Patients</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
              About
            </Text>
            <Text style={{ color: "#777777", fontSize: 16, lineHeight: 22 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
              Speciality
            </Text>
            {data.map((specialty, index) => (
              <Text
                key={index}
                style={{ color: "#777777", fontSize: 16, lineHeight: 24 }}
              >
                {specialty}
              </Text>
            ))}
          </View>
          <PrimaryButton
          style={{marginBottom:30}}
            backgroundColor="#246BFD"
            color="#FFF"
            label="Book Appointment"
            onPress={() => router.push("./bookAppointment")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default doctorDetails;

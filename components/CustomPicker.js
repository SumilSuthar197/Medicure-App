import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
const CustomPicker = ({
  countryList,
  selectedCountries,
  onSelectionChange,
}) => {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(countryList);
  const [selectedCountry, setSelectedCountry] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    setData(countryList);
  }, [countryList]);

  const onSearch = (search) => {
    if (search !== "") {
      let tempData = countryList.filter((item) => {
        return item.country.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(countryList);
    }
  };
  const handleCountrySelection = (selectedCountry) => {
    onSelectionChange([...selectedCountries, selectedCountry]);
    setSelectedCountry("");
    setClicked(!clicked);
    onSearch("");
    setSearch("");
  };
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <Text style={{ fontWeight: "600" }}>
          {selectedCountry === "" ? "Select Symptoms" : selectedCountry}
        </Text>
        {clicked ? (
          <AntDesign name="down" size={20} color="black" />
        ) : (
          <AntDesign name="up" size={20} color="black" />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: 300,
            alignSelf: "center",
            width: "90%",
            backgroundColor: "#fff",
            borderRadius: 10,
            position: "absolute",
            top: -330,
          }}
        >
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: "90%",
              height: 50,
              alignSelf: "center",
              borderWidth: 0.2,
              borderColor: "#8e8e8e",
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          />
          <ScrollView>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "85%",
                  alignSelf: "center",
                  height: 50,
                  justifyContent: "center",
                  borderBottomWidth: 0.5,
                  borderColor: "#8e8e8e",
                }}
                onPress={() => handleCountrySelection(item.country)}
              >
                <Text style={{ fontWeight: "600" }}>{item.country}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default CustomPicker;

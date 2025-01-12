import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  blueColor,
  borderColor,
  lightTextColor,
  textBlack,
  whiteText,
} from "../../constants/color";

const DoctorCardComponent = ({ doctor, onBookAppointment, onViewProfile }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.doctorCard}>
        <View style={styles.doctorCardHeader}>
          <Image
            style={styles.doctorImage}
            source={{
              uri: doctor?.image
                ? doctor?.image
                : "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
            }}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor?.name}</Text>
            <Text style={styles.doctorEducation}>
              {doctor?.education?.field}
            </Text>
          </View>
        </View>

        <View style={styles.doctorDetails}>
          <Text style={styles.detailsText}>Location: {doctor?.location}</Text>
          <Text style={styles.detailsText}>Contact: {doctor?.contact}</Text>
        </View>

        <View style={styles.doctorActions}>
          <TouchableOpacity
            style={[styles.doctorButton, { backgroundColor: blueColor }]}
            onPress={() => onBookAppointment(doctor)}
          >
            <Text style={[styles.doctorButtonText, { color: whiteText }]}>
              Book Appointment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doctorButton}
            onPress={() => onViewProfile(doctor)}
          >
            <Text style={styles.doctorButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: whiteText,
    borderColor: borderColor,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
  },
  doctorCardHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 2,
    borderColor: borderColor,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: textBlack,
  },
  doctorEducation: {
    fontSize: 14,
    color: lightTextColor,
    marginTop: 4,
  },
  doctorDetails: {
    marginVertical: 4,
  },
  detailsText: {
    fontSize: 14,
    color: textBlack,
    marginBottom: 5,
    fontWeight: "500",
  },
  doctorActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 4,
  },
  doctorButton: {
    borderColor: blueColor,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  doctorButtonText: {
    color: blueColor,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default DoctorCardComponent;

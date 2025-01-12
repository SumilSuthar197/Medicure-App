import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from ".";
import { data } from "../constants/data";

export const getUpcomingAppointments = async (date) => {
  const url = `/doctorappointments/${date}`;
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      appointments: [
        {
          _id: "661de20833bef8adec917a83",
          date: "2024-04-18",
          doctor_email: "sunil@gmail.com",
          doctor_name: "Sunil Yadav",
          image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
          pathology_id: "",
          patient_email: "sumil@gmail.com",
          patient_image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1721970714/tlxne5wfk75t0qpmnqlp.jpg",
          patient_name: "Sumil Suthar",
          prescription_id: "",
          slot: "4:20 pm",
          status: "upcoming",
        },
      ],
    },
  });
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const submitAppointmentReview = async (
  patient_email,
  appointment_id,
  advisory_text,
  prescription_text
) => {
  const url = "/submit_review";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({});

  return axiosInstance.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const submitLeaveRequest = async (data) => {
  const url = "/applyleave";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      output: true,
    },
  });

  return axiosInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

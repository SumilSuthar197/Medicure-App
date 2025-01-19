import axios from "axios";
import { axiosInstance } from "./index";

export const userLogin = (userType, email, password, location) => {
  const url = "/login";
  const data = {
    user: userType,
    email: email.toLowerCase(),
    password: password,
  };
  console.log(data);
  console.log(location);

  return Promise.resolve({
    data: {
      output: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjYyODQxMywianRpIjoiNWE3ZTRmZjgtZDQ2Ni00M2ViLTg4MGUtOTgwYzM2NzQwNjIzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN1bWlsQGdtYWlsLmNvbSIsIm5iZiI6MTczNjYyODQxMywiY3NyZiI6IjEwZGM3M2RhLTkzYjYtNDFkMS04YzE1LTAyNTEyYjkyODM3MyIsImV4cCI6MTczNjcxNDgxM30.fJL-bmnVorEeNvEDAq1tNtGfygXtvwrW8-OXCFP1uJs",
    },
  });
  const doctorResp = {
    output: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjY3NzcxMCwianRpIjoiZDI2MWY1NDItOGZiMS00MWMzLTgxZmItMzgxYzU2MDQ5ZjNhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN1bmlsQGdtYWlsLmNvbSIsIm5iZiI6MTczNjY3NzcxMCwiY3NyZiI6IjFiOGFiYmEwLTdhMWQtNDhhYi1iOTExLTkyNWYzZWM1YmM2NSIsImV4cCI6MTczNjc2NDExMH0.yqcQoNaID7s8c1tld5iAJvdEaAn3VUESe787htiPDms",
  };
  return axiosInstance.post(
    url,
    userType === "DOCTOR" ? { ...data, location } : data
  );
};

export const userForgetPassword = (email) => {
  return Promise.resolve({});
  const url = "/forget-password";
  return axiosInstance.post(url, {
    email: email.toLowerCase(),
  });
};

export const userRegister = (userType, name, email, mobile, password) => {
  const url = "/register";

  return Promise.resolve({
    data: {
      output: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjYyODQxMywianRpIjoiNWE3ZTRmZjgtZDQ2Ni00M2ViLTg4MGUtOTgwYzM2NzQwNjIzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN1bWlsQGdtYWlsLmNvbSIsIm5iZiI6MTczNjYyODQxMywiY3NyZiI6IjEwZGM3M2RhLTkzYjYtNDFkMS04YzE1LTAyNTEyYjkyODM3MyIsImV4cCI6MTczNjcxNDgxM30.fJL-bmnVorEeNvEDAq1tNtGfygXtvwrW8-OXCFP1uJs",
    },
  });

  return axiosInstance.post(url, {
    user: userType,
    name,
    email: email.toLowerCase(),
    mobile,
    password,
  });
};

export const uploadImageToCloudinary = async (uri) => {
  const formData = new FormData();
  let uriParts = uri.split(".");
  let fileType = uriParts[uriParts.length - 1];

  formData.append("file", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append("upload_preset", "medicure");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/deohymauz/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response?.data?.url);

    return {
      imageUrl: response?.data?.url,
    };
  } catch (e) {
    console.log(e);
  }
};

export const getAddress = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  return axios.get(url);
};

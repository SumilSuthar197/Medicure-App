import { axiosInstance } from "./index";

export const userLogin = (userType, email, password) => {
  const url = "/login";

  return Promise.resolve({
    data: {
      output: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjYyODQxMywianRpIjoiNWE3ZTRmZjgtZDQ2Ni00M2ViLTg4MGUtOTgwYzM2NzQwNjIzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN1bWlsQGdtYWlsLmNvbSIsIm5iZiI6MTczNjYyODQxMywiY3NyZiI6IjEwZGM3M2RhLTkzYjYtNDFkMS04YzE1LTAyNTEyYjkyODM3MyIsImV4cCI6MTczNjcxNDgxM30.fJL-bmnVorEeNvEDAq1tNtGfygXtvwrW8-OXCFP1uJs",
    },
  });

  return axiosInstance.post(url, {
    user: userType,
    email: email.toLowerCase(),
    password: password,
  });
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

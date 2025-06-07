import axios from "./axiosCustomize";

const createUserAPI = (fullName, email, password, phone) => {
  const API = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(API, data);
};

const updateUserAPI = () => {};

export { createUserAPI, updateUserAPI };

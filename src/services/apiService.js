import axios from "./axiosCustomize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL, data);
};

const updateUserAPI = () => {};

const fetchAllUserAPI = () => {
  const URL = "/api/v1/user";
  return axios.get(URL);
}

export { createUserAPI, updateUserAPI, fetchAllUserAPI };

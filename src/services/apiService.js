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

const updateUserAPI = (id, fullName, phone, avatar = "") => {
  const URL = "/api/v1/user";
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  };
  return axios.put(URL, data);
};

const deleteUserAPI = (id) => {
  const URL = `/api/v1/user/${id}`;
  return axios.delete(URL);
};

const fetchAllUserAPI = () => {
  const URL = "/api/v1/user";
  return axios.get(URL);
};

const handleUploadFile = (file, folder) => {
  const URL = "/api/v1/file/upload";
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": folder,
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL, bodyFormData, config);
};

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  handleUploadFile,
};

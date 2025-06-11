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

const fetchAllUserAPI = (current, pageSize) => {
  const URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
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

const registerUserAPI = (fullName, email, password, phone) => {
  const URL = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL, data);
};

const loginUserAPI = (email, password, delay = 0) => {
  const URL = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: delay,
  };
  return axios.post(URL, data);
};

const getUserInfoAPI = () => {
  const URL = "/api/v1/auth/account";
  return axios.get(URL);
};

const logoutUserAPI = () => {
  const URL = "/api/v1/auth/logout";
  return axios.post(URL);
};

const fetchAllBookAPI = (current, pageSize) => {
  const URL = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL);
};

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
  const URL = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(URL, data);
};

const deleteBookAPI = (id) => {
  const URL = `/api/v1/book/${id}`;
  return axios.delete(URL);
};

const updateBookAPI = (
  id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category,
) => {
  const URL = "/api/v1/book";
  const data = {
    _id: id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL, data);
};

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  handleUploadFile,
  registerUserAPI,
  loginUserAPI,
  getUserInfoAPI,
  logoutUserAPI,
  fetchAllBookAPI,
  createBookAPI,
  deleteBookAPI,
  updateBookAPI,
};

// test
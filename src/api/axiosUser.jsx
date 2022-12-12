import axiosClient from "./axiosClient";

const axiosUser = {
  getAll: async () => {
    const url = "users";
    return await axiosClient.get(url);
  },
  postAll: async (params) => {
    const url = "users";
    return await axiosClient.post(url, params);
  },
  deleteFirst: async (params) => {
    const url = "users/";
    return await axiosClient.delete(url + params);
  },
  getFirst: async (params) => {
    const url = "users/";
    return await axiosClient.get(url + params);
  },
  pulAll: async (params, dataEdit) => {
    const url = "users/";
    return await axiosClient.put(url + params, dataEdit);
  },
};

export default axiosUser;

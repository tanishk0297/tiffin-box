import axios from "axios";
const http = axios.create({
  baseURL: "https://tiffin-box-api.vercel.app",
  // baseURL: "http://localhost:8080",
  //baseURL: "",
  headers: {
    "Content-type": "application/json"
  }
});
http.interceptors.request.use(
  (config) => {
    const UserObject = JSON.parse(localStorage.getItem('UserObject'));
    console.log('userobject', UserObject)
    if (UserObject) {
      config.headers['x-access-token'] = UserObject.Token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
http.interceptors.response.use((response) => response, (error) => {

  // whatever you want to do with the error
  if (error.response.status === 401 || error.response.status === 403) {
    window.location.href = '/login'
  }
  else {
    console.log(error.response.status)
    throw error;
  }
});
export default http;
import Axios from "axios"

const axios = Axios.create({
     baseURL: "/api",
     withCredentials: true
})

axios.interceptors.request.use((value) => {
    value.headers.Authorization = getCookie("Auth-Token")
    console.log(value.headers)
    return value
})

function getCookie(cookieName: string) {
    let cookie: { [key: string] : string } = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

export default axios
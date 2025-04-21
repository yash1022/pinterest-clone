import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
 
});

// Flag to prevent infinite retry loop
// let isRefreshing = false;

// api.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) return Promise.reject(error); // prevent spam

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const userId = JSON.parse(localStorage.getItem("user"))?.id;

//         // Hit refresh token route
//         const res = await axios.post("http://localhost:3000/auth/refresh-token", {
//           id: userId,
//           refreshToken: null // not sending manually, coming from cookie
//         }, {
//           withCredentials: true
//         });

//         if (res.status === 200) {
//           isRefreshing = false;
//           // Retry original request
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         isRefreshing = false;
//         console.log("Refresh token failed", refreshError);
//         // Optional: Logout user
//         window.location.href = '/login'; // or whatever your logout path is
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
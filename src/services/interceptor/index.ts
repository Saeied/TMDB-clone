import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzJjYzEzMWMxMDM3NTJmZTc3ZmNlZjA4MmE3M2Y5YSIsIm5iZiI6MTc0Njk2NzkyMS43NjcsInN1YiI6IjY4MjA5ZDcxYzlkNDllODNiY2ExNWYwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6PqU_sCg6CvkxQYubATew5FRe2FOaU-yRGdMsUO5MUA`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;

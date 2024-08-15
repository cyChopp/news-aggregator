import axios from "axios";
import { TParams } from "./TShared";

const NYTIMES_BASE_URL = "https://api.nytimes.com/svc/search/v2/";
const THENEWSAPI_BASE_URL = "https://api.thenewsapi.com/v1/news/";
const GUARDIAN_BASE_URL = "https://content.guardianapis.com/";

const nytimesApi = axios.create({
  baseURL: NYTIMES_BASE_URL,
});

const theNewsApi = axios.create({
  baseURL: THENEWSAPI_BASE_URL,
});

const guardianApi = axios.create({
  baseURL: GUARDIAN_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { nytimesApi, theNewsApi, guardianApi };

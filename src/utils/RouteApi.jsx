import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
export const API_URL_IMG = "http://127.0.0.1:8000/storage/uploads";

export const API_ROUTE = {
  CATEGORIES: API_URL + "/categories",

  LOGIN: API_URL + "/login",
  LOGOUT: API_URL + "/logout",
  REGISTER: API_URL + "/register",
  CURRENTUSER: API_URL + "/currentuser",

  ADDARTICLE: API_URL + "/articles",
  RANDOMARTICLE: API_URL + "/articles/random",
  EDITARTICLE: API_URL + "/articles/",
  DELETEARTICLE: API_URL + "/articles/",

  LOCATION: API_URL + "/locations",

  IMG: API_URL + "/images",
  DELETEIMG: API_URL + "/images/",
};

export const API_FUNCTION = {
  // CATEGORIES //
  allCategories: async () => {
    try {
      const res = await axios.get(API_ROUTE.CATEGORIES);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  // CURRENTUSER //
  currentUser: async () => {
    try {
      const res = await axios.get(API_ROUTE.CURRENTUSER, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      });

      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  },

  // LOGOUT AND REGISTER//
  logout: () => {},

  // ARTICLE //

  allArticle: async () => {
    try {
      const res = await axios.get(API_ROUTE.ADDARTICLE);
      return res.data;
    } catch {}
  },

  getRandomArticle: async () => {
    try {
      const res = await axios.get(API_ROUTE.RANDOMARTICLE);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  // LOCATION //
  allLocation: async () => {
    try {
      const res = await axios.get(API_ROUTE.LOCATION);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};

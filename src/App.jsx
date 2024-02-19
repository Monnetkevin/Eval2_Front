import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/menu/Navbar";
import { API_FUNCTION } from "./utils/RouteApi";
import Header from "./components/menu/Header";
import { GlobalContext } from "./components/context/GlobalContext";
import Login from "./pages/connexion/Login";
import Register from "./pages/connexion/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Article from "./pages/articles/Article";

function App() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const allCategories = async () => {
    try {
      await API_FUNCTION.allCategories().then((res) => setCategories(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allCategories();
    API_FUNCTION.allArticle().then((res) => {
      setArticles(res);
    });
    API_FUNCTION.allLocation().then((res) => setLocations(res));
  }, []);

  useEffect(() => {
    if (token) {
      API_FUNCTION.currentUser().then((res) => setUser(res));
      setIsConnected(true);
      setIsLoaded(true);
    }
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        isLoaded,
        user,
        setUser,
        token,
        setToken,
        isConnected,
        setIsConnected,
        articles,
        setArticles,
        locations,
        setLocations,
      }}
    >
      <BrowserRouter>
        <Navbar />
        {isLoaded && <Header />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={3}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/article" element={<Article />} />
          <Route path="/contact" element="" />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;

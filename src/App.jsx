import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

import "./styles/main.css";
import { Sidebar } from "./components/Sidebar";
import { Alert } from "./components/Alert";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { MisTrainings } from "./pages/MisTrainings";
import { Layout } from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ titulo: "", mensaje: "", hidden: true });
  //TODO: SEGUIR ACTUALIZANDO LA PAG CUANDO SEA NECESARIO
  const [acualPage, setAcualPage] = useState("Inicio");

  const closeAlert = () => {
    setAlert({ titulo: "", mensaje: "", hidden: true });
  };

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userData");
    setUser(null);
    setUserData(null);
  };

  const refreshToken = async () => {
    await axios
      .post("http://localhost:8080/api/v1/auth/refresh-token", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        console.log(resp);
        let userRefresh = user;
        // userRefresh.access_token = resp.data.access_token;
        // userRefresh.refresh_token = resp.data.refresh_token;
        // setUser(userRefresh);
        // localStorage.setItem("login", JSON.stringify(userRefresh));
        if (resp.data == "") {
          logout();
        }
      })
      .catch((err) => {
        console.log(err);
        logout();
      });
  };

  const testCredentianls = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:8080/api/v1/users/my-user", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((response) => {
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.contenido)
        );
        if (response.status == 200) {
          setUserData(response.data.contenido);
          console.log("Credenciales testeadas y funcionan");
        }
      })
      .catch((err) => {
        console.log(
          "Credenciales testeadas y NO funcionan",
          "Probando refresh token"
        );
        // refreshToken();
        logout();
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      setUser(JSON.parse(localStorage.getItem("login")));
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    // console.log(user.access_token);
    if (user) testCredentianls();
  }, [user]);

  const UserProviderValue = useMemo(
    () => ({
      user,
      setUser,
      alert,
      setAlert,
      closeAlert,
      logout,
      userData,
      isLoading,
      setIsLoading,
      testCredentianls,
    }),
    [user, setUser, alert, setAlert, userData, isLoading, setIsLoading]
  );

  return (
    <>
      <UserContext.Provider value={UserProviderValue}>
        {isLoading ? (
          <h1>cargando...</h1>
        ) : (
          <>
            <BrowserRouter>
              <Sidebar></Sidebar> <Navbar></Navbar>
              <Routes>
                {user ? (
                  <>
                    {/* INVESTIGAR SOBRE SHAREDLAYOUT https://www.youtube.com/watch?v=59IXY5IDrBA */}
                    <Route path="/" element={<Layout />}>
                      <Route
                        path="*"
                        element={<Navigate to="/home" replace />}
                      />
                      <Route path="my-trainings" element={<MisTrainings />} />
                      <Route path="home" element={<Home />} />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route path="/*" element={<Navigate to={"/login"} />} />
                    <Route path="/login" element={<Login />} />
                  </>
                )}
              </Routes>
            </BrowserRouter>
          </>
        )}

        <Alert></Alert>
      </UserContext.Provider>
    </>
  );
}
export default App;

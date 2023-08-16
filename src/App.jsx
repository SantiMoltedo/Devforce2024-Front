import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useMemo, useState } from "react";
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
import { Loader } from "./components/Loader";
import { CrearTraining } from "./pages/CrearTraining";
import { Training } from "./pages/Training";
import { MentorActions } from "./pages/MentorActions";
import { Profile } from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [alert, setAlert] = useState({ titulo: "", mensaje: "", hidden: true });
  //TODO: SEGUIR ACTUALIZANDO EL TITULO DE LA PAG
  const [acualPage, setAcualPage] = useState("Inicio");

  const closeAlert = () => {
    setAlert({ tipo: "error", titulo: "", mensaje: "", hidden: true });
  };

  const logout = () => {
    localStorage.clear();
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
    console.log("testing credentials");
    setIsLoadingAuth(true);
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
        setIsLoadingAuth(false);
        logout();
      });
  };

  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      setUser(JSON.parse(localStorage.getItem("login")));
    } else {
      logout();
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    // console.log("Cambios en UserData", userData);
    userData ? setIsLoadingAuth(false) : null;
  }, [userData]);

  useEffect(() => {
    // console.log("Cambios en User", user);
    if (user) {
      testCredentianls();
      // console.log("testCredentials");
    }
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
      testCredentianls,
      loadingContent,
      setLoadingContent,
      isLoadingAuth,
      setIsLoadingAuth,
    }),
    [user, setUser, alert, setAlert, userData, loadingContent, isLoadingAuth]
  );

  return (
    <>
      <UserContext.Provider value={UserProviderValue}>
        {isLoadingAuth ? (
          <Loader />
        ) : (
          <>
            <BrowserRouter>
              <Sidebar></Sidebar> <Navbar></Navbar>
              <Routes>
                {userData ? (
                  <>
                    <Route path="/" element={<Layout />}>
                      <Route
                        path="my-trainings"
                        element={
                          <>
                            <MisTrainings />
                            {loadingContent && <Loader />}
                          </>
                        }
                      />
                      <Route
                        path="my-courses"
                        element={
                          <>
                            <h1>MIS CURSOS (udemy)</h1>
                            {loadingContent && <Loader />}
                          </>
                        }
                      />
                      <Route
                        path="home"
                        element={
                          <>
                            <Home />
                            {loadingContent && <Loader />}
                          </>
                        }
                      />
                      <Route
                        path="create-training"
                        element={
                          <>
                            <CrearTraining />
                            {loadingContent && <Loader />}
                          </>
                        }
                      />
                      <Route
                        path="training/:trainingId"
                        element={
                          <>
                            <Training />
                            {loadingContent && <Loader />}
                          </>
                        }
                      />

                      <Route
                        path="profile"
                        element={
                          <>
                            <Profile id={userData.id} />
                            {loadingContent && <Loader />}
                          </>
                        }
                      />
                      {userData.role === "MENTOR" ? (
                        <>
                          <Route
                            path="mentor-actions"
                            element={
                              <>
                                {loadingContent && <Loader />}
                                <MentorActions />
                              </>
                            }
                          />
                        </>
                      ) : null}
                      <Route path="*" element={<Navigate to={"/home"} />} />
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

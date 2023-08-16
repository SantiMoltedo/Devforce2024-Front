import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setUser, setAlert, setIsLoadingAuth, isLoadingAuth } =
    useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const expensesListResp = async () => {
    setIsLoadingAuth(true);
    await axios
      .post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: email.toLowerCase(),
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
          },
        }
      )
      .then((response) => {
        setUser({
          email: email,
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: email,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        setAlert({
          tipo: "error",
          titulo: "Error al iniciar sesión",
          mensaje: "Revisa tus credenciales",
          hidden: false,
        });
      });
    setIsLoadingAuth(false);
    nav("/home");
  };

  return (
    <div id="login" className="flex">
      <div className="w-8/12 min-h-screen bg-black"></div>
      <div className="min-h-screen grow flex items-center justify-center">
        <form
          className="h-2/6 w-8/12 flex flex-col items-start justify-evenly"
          onSubmit={(ev) => {
            ev.preventDefault();
            expensesListResp();
          }}
        >
          <h1 className="text-center">Bienvenido a Liceman</h1>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" className="bg-red-400 py-1 px-4 rounded-md">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

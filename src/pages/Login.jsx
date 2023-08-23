import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIllustration from "../assets/images/Login.png";

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
    <div id="login" className="flex mt-8">
      <div className="min-h-[calc(100vh-96px)] w-6/12 bg-white relative">
        <img
          className="absolute bottom-0 left-0 h-[80dvh] w-[70dvw]"
          src={LoginIllustration}
          alt=""
        />
      </div>
      <div className="min-h-[calc(100vh-96px)] grow flex items-center justify-center">
        <form
          className="h-2/6 w-8/12 flex flex-col items-start justify-evenly px-[10%]"
          onSubmit={(ev) => {
            ev.preventDefault();
            expensesListResp();
          }}
        >
          <h1 className="text-[28px] mb-6 font-bold text-secondary leading-normal">
            ¡Te damos la bienvenida a Liceman!
          </h1>
          <label className="w-full font-medium font-xl mb-6">
            <span className="mb-2">Email</span>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Nombre de usuario o correo electronico"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </label>
          <label className="w-full font-medium font-xl">
            <span className="mb-2">Contraseña</span>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </label>
          <button type="submit" className="button-primary mt-8">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

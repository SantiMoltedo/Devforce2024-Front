import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { redirect } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState({ A: "A" });

  const postLoginAxios = async () => {
    axios
      .post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: "user@mail.com",
          password: "password",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
          },
        }
      )
      .then((res) => setLogin(res))
      .catch(function (error) {
        console.log(error);
      });

    // const data = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify({ email: "user@mail.com", password: "password" }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Cache: "no-cache",
    //   },
    // }).then((resp) => resp.json());
    // console.log(data);
  };

  useEffect(() => {
    const expensesListResp = async () => {
      await axios
        .post(
          "http://localhost:8080/api/v1/auth/authenticate",
          {
            email: "user@mail.com",
            password: "password",
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
          console.log(JSON.stringify(response.data));
          setLogin(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    expensesListResp();
  }, []);

  return (
    <div id="login" className="flex">
      <div className="w-8/12 min-h-screen bg-black"></div>
      <div className="min-h-screen grow flex items-center justify-center">
        <form
          className="h-2/6 w-8/12 flex flex-col items-start justify-evenly"
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log(userName);
            setUser({ id: 1, name: "alsjdlasd" });
            localStorage.setItem(
              "login",
              JSON.stringify({ id: 1, name: "alsjdlasd" })
            );
            document.cookie = "userId=1;SameSite=Strict";
            document.cookie = 'userName = "alsndasd"';
            redirect("/");
          }}
        >
          <h1 className="text-center">Bienvenido a Liceman</h1>
          <input
            type="text"
            name="username"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
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

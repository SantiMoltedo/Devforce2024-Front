import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgMisc from "../assets/icons/bg-misc-create-training.svg";

export const CrearTraining = () => {
  const [area, setArea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");

  const { user, testCredentianls, alert, setAlert } = useContext(UserContext);
  const navigate = useNavigate();

  const submitTraining = () => {
    axios
      .post(
        `http://localhost:8080/api/v1/trainings`,
        {
          area: area,
          title: titulo,
          comment: descripcion,
          link: link,
        },
        {
          headers: {
            Authorization: "Bearer " + user.access_token,
          },
        }
      )
      .then((resp) => {
        console.log(resp.status, resp.data.mensaje);
        setAlert({
          tipo: "success",
          titulo: "Solicitud creada",
          mensaje: resp.data.mensaje,
          hidden: false,
        });
        navigate("/home");
      })
      .catch((err) => {
        testCredentianls();
        console.log(err);
        setAlert({
          tipo: "error",
          titulo: "Solicitud no creada",
          mensaje: "Revisa los datos, y volve a intentar",
          hidden: false,
        });
      });
  };

  return (
    <>
      <div
        className="w-full flex items-center justify-center mt-10"
        id="crear-solicitud"
      >
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            submitTraining();
          }}
          className="w-[500px] rounded-[15px] shadow flex flex-col bg-white py-7 px-16 mb-10"
        >
          <h1 className="title text-secondary text-[28px] mb-5">
            Crear training
          </h1>
          <label className="mb-1" htmlFor="solicitud-area">
            <span>Área a desarrollar:</span>{" "}
            <strong className="text-red-400">*</strong>
          </label>
          <select
            name="area"
            value={area}
            id="solicitud-area"
            onChange={(ev) => {
              setArea(ev.target.value);
            }}
          >
            <option value="" disabled hidden>
              Seleccionar un área
            </option>
            <option value="BACKEND">BACKEND</option>
            <option value="DATA">DATA</option>
            <option value="DEVOPS">DEVOPS</option>
            <option value="FRONTEND">FRONTEND</option>
            <option value="SALESFORCE">SALESFORCE</option>
          </select>

          <label className="mb-1" htmlFor="solicitud-descripcion">
            <span>Título de la solucitud:</span>{" "}
            <strong className="text-red-400">*</strong>
          </label>
          <input
            id="solicitud-descripcion"
            type="text"
            placeholder="Necsito aprender React"
            name="titulo"
            value={titulo}
            onChange={(ev) => {
              setTitulo(ev.target.value);
            }}
            required
          />

          <label className="mb-1" htmlFor="solicitud-link">
            <span>Link al curso:</span>
          </label>
          <input
            id="solicitud-link"
            type="text"
            placeholder="https://gire.udemy.com/course/react-the-complete-guide/"
            name="link"
            value={link}
            onChange={(ev) => {
              setLink(ev.target.value);
            }}
          />

          <label className="mb-1" htmlFor="solicitud-descripcion">
            <span>Comentario de la solucitud:</span>{" "}
            <strong className="text-red-400">*</strong>
          </label>
          <textarea
            id="solicitud-descripcion"
            placeholder="Escribí tu comentario"
            name="descripcion"
            value={descripcion}
            onChange={(ev) => {
              setDescripcion(ev.target.value);
            }}
            required
          />

          <button type="submit" className="button-primary mt-4">
            Enviar petición
          </button>
        </form>
      </div>
      <img
        className="absolute bottom-0 left-0 w-full z-[-1]"
        src={bgMisc}
        alt=""
      />
    </>
  );
};

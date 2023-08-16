import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  useEffect(() => {
    console.log(alert);
  }, [alert]);

  return (
    <div
      className="w-full flex items-center justify-center mt-10 mb-10"
      id="crear-solicitud"
    >
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          submitTraining();
        }}
        className="w-[800px] border flex flex-col px-40 rounded-3xl bg-neutral-50"
      >
        <h1 className="text-3xl font-bold text-center my-14">
          Crear solicitud
        </h1>
        <label htmlFor="solicitud-area">
          <span>Area a desarrollar:</span>{" "}
          <strong className="text-red-400">*</strong>
        </label>
        <select
          name="area"
          value={area}
          id="solicitud-area"
          onChange={(ev) => {
            setArea(ev.target.value);
          }}
          defaultValue={""}
        >
          <option value="" disabled selected hidden>
            Seleccionar un área
          </option>
          <option value="BACKEND">BACKEND</option>
          <option value="DATA">DATA</option>
          <option value="DEVOPS">DEVOPS</option>
          <option value="FRONTEND">FRONTEND</option>
          <option value="SALESFORCE">SALESFORCE</option>
        </select>

        <label htmlFor="solicitud-descripcion">
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

        <label htmlFor="solicitud-descripcion">
          <span>Comentario de la solucitud:</span>{" "}
          <strong className="text-red-400">*</strong>
        </label>
        <input
          id="solicitud-descripcion"
          type="text"
          placeholder="Me recomendas algun curso?"
          name="descripcion"
          value={descripcion}
          onChange={(ev) => {
            setDescripcion(ev.target.value);
          }}
          required
        />
        <label htmlFor="solicitud-link">
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
        <button type="submit" className="button-outline mb-16 mt-4">
          Enviar petición
        </button>
      </form>
    </div>
  );
};

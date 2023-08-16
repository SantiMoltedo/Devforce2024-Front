import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const Alert = () => {
  const { alert, closeAlert } = useContext(UserContext);

  return (
    <div
      id="alert"
      className={`${alert.hidden ? "hidden" : ""} fixed top-1 right-1`}
      role="alert"
      onClick={() => closeAlert()}
    >
      <div
        className={`${alert.tipo === "error" ? "bg-red-500 " : ""}${
          alert.tipo === "success" ? "bg-green-500 " : ""
        }text-white font-bold rounded-t px-4 py-2`}
      >
        {alert.titulo}
      </div>
      <div
        className={`${
          alert.tipo === "error" ? "bg-red-100 border-red-400 " : ""
        }
        ${
          alert.tipo === "success" ? "bg-green-200 border-green-400 " : ""
        }border border-t-0 rounded-b px-4 py-3 text-neutral-900`}
      >
        <p>{alert.mensaje}</p>
      </div>
    </div>
  );
};

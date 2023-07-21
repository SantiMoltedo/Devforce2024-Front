import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Alert = () => {
  const { alert, closeAlert } = useContext(UserContext);
  return (
    <div
      id="alert"
      className={`${alert.hidden ? "hidden" : ""} absolute top-1 right-1`}
      role="alert"
      onClick={() => closeAlert()}
    >
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {alert.tipo}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{alert.mensaje}</p>
      </div>
    </div>
  );
};

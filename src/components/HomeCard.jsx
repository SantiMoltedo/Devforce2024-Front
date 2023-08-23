import { MicrosoftTeamsLogo } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export const HomeCard = ({ title, training, icon }) => {
  return (
    <div className="w-1/2 bg-white rounded-[15px] shadow px-6 py-7">
      {training ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            {icon}
            <h2 className="text-primary font-medium text-[22px]">
              <span>{title}</span>:{" "}
              <Link
                className="underline text-primary"
                to={`/training/${training.id}`}
              >
                {training.title}
              </Link>
            </h2>
          </div>
          <ul className="text-dfText text-[15px] font-medium leading-5 ms-10">
            <li>
              <b>Creada el:</b>{" "}
              <span>{training.creationDate.slice(0, -16)}</span>
            </li>
            <li>
              <b>Estado:</b>{" "}
              <span>
                {training.status.charAt(0) +
                  training.status.slice(1).toLowerCase().replace("_", " ")}
              </span>
            </li>
            <li>
              <b>Tu comentario:</b> <span>{training.comments[0].message}</span>
            </li>
            {training.mentorId ? (
              <>
                <li className="pb-1 flex gap-2">
                  <b>Mentor asignado:</b>{" "}
                  {training.mentorId.hasTeams ? (
                    <>
                      <a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${training.mentorId.email}`}
                      >
                        <MicrosoftTeamsLogo
                          size={22}
                          color="#333"
                        ></MicrosoftTeamsLogo>
                      </a>
                    </>
                  ) : null}
                  <p className="text-dfText text-[15px] font-medium leading-5">
                    {training.mentorId.firstname +
                      ", " +
                      training.mentorId.lastname}
                  </p>
                </li>
              </>
            ) : (
              <li>
                <b>Mentor asignado:</b> {"Todavía no hay mentor asignado"}
              </li>
            )}
          </ul>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-4">
            {icon}
            <h2 className="text-primary font-medium text-[22px]">
              <span>{title}</span>:{" "}
            </h2>
          </div>
          <div className="text-dfText text-[15px] font-medium leading-5 ms-10">
            <p className="mb-6">No tenés solicitudes...</p>
            <Link className="button-primary" to={"/my-trainings"}>
              Revisá tus peticiones
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

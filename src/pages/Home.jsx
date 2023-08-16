import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { BsMicrosoftTeams } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { TbMailPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { PiSmileySadBold } from "react-icons/pi";

export const Home = () => {
  const {
    userData,
    user,
    testCredentianls,
    loadingContent,
    setLoadingContent,
  } = useContext(UserContext);

  const [lastTraining, setLastTraining] = useState(null);
  const [approvedTrainings, setApprovedTrainings] = useState(null);

  const getTrainings = async () => {
    setLoadingContent(true);
    await axios
      .get(`http://localhost:8080/api/v1/users/${userData.id}`, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          let trainings = resp.data.contenido.trainings;
          console.log(resp.data.contenido.trainings);
          setLastTraining(trainings[trainings.length - 1]);
          setApprovedTrainings(
            trainings.find((training) => training.approvedDate)
          );
        }
      })
      .catch((err) => {
        console.log(err);
        testCredentianls();
      });
    setLoadingContent(false);
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const getDayTime = () => {
    let hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Buen dia";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    if (hora >= 20) return "Buenas noches";
  };

  if (loadingContent) {
    return (
      <>
        <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
          {getDayTime()}, {userData.firstname}
        </h1>
        <div className="mx-20 mt-10"></div>
      </>
    );
  }

  if (lastTraining && approvedTrainings) {
    return (
      <>
        <h1>HAY AMBAS</h1>
      </>
    );
  }

  if (lastTraining && !approvedTrainings) {
    return (
      <>
        <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
          {getDayTime()}, {userData.firstname}
        </h1>
        <div className="grid grid-cols-2 px-10 pt-6 gap-10">
          <div className="w-full rounded-lg shadow-lg px-6 py-4">
            <div className="flex items-baseline gap-2">
              <BsClock size={28} color="#333" />
              <h2 className="font-bold text-xl mb-2">
                <span className="underline">
                  Sobre tu última solicitud pendiente
                </span>
                : {lastTraining.title}
              </h2>
            </div>
            <div className="">
              <ul>
                <li className="pb-1">
                  <b>Creada el:</b>{" "}
                  <span>{lastTraining.creationDate.slice(0, -16)}</span>
                </li>
                <li className="pb-1">
                  <b>Estado:</b>{" "}
                  <span>
                    {lastTraining.status.charAt(0) +
                      lastTraining.status
                        .slice(1)
                        .toLowerCase()
                        .replace("_", " ")}
                  </span>
                </li>
                <li className="pb-1">
                  <b>Tu comentario:</b>{" "}
                  <span>{lastTraining.comments[0].message}</span>
                </li>
                {lastTraining.mentorId ? (
                  <>
                    <li className="pb-1">
                      <b>Mentor asignado:</b>{" "}
                      {lastTraining.mentorId.firstname +
                        ", " +
                        lastTraining.mentorId.lastname}
                    </li>
                    <li className="pb-1 flex items-center gap-2">
                      {lastTraining.mentorId.hasTeams ? (
                        <>
                          <b>Chatea con {lastTraining.mentorId.firstname}:</b>
                          <a
                            href={`https://teams.microsoft.com/l/chat/0/0?users=${lastTraining.mentorId.email}`}
                          >
                            <BsMicrosoftTeams
                              size={22}
                              color="#333"
                            ></BsMicrosoftTeams>
                          </a>
                        </>
                      ) : (
                        <>
                          <b>
                            Comunicate con {lastTraining.mentorId.firstname}
                          </b>
                          <a href={`mailto:${lastTraining.mentorId.email}`}>
                            <TbMailPlus size={22} color="#333" />
                          </a>
                        </>
                      )}
                    </li>
                  </>
                ) : (
                  <li className="pb-1">
                    <b>Mentor asignado:</b> {"Todavia no hay mentor asignado"}
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="w-full rounded-lg shadow-lg px-6 py-4">
            <div className="flex items-baseline gap-2">
              <BsBell size={28} color="#333" />
              <h2 className="font-bold text-xl mb-2">
                No tenes solicitudes aprobadas...
              </h2>
            </div>
            <div className="pt-8 flex justify-center items-center">
              <Link to={"/my-trainings"} className="bg-teal-400 p-2 rounded-lg">
                Revisá tus peticiones
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!lastTraining) {
    return (
      <>
        <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
          {getDayTime()}, {userData.firstname}
        </h1>
        <div className="p-10 pt-8">
          <div className="flex items-center gap-2">
            <PiSmileySadBold size={32} color="#333"></PiSmileySadBold>
            <h2 className="font-semibold text-xl ">No tenes solicitudes...</h2>
          </div>
          <div className="pt-2 pb-2 ms-8 flex justify-start items-center">
            <Link
              to={"/create-training"}
              className="button-outline border-neutral-500"
            >
              Crea una nueva desde acá
            </Link>
          </div>
        </div>
      </>
    );
  }
};

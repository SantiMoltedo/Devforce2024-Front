import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { BsMicrosoftTeams } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { TbMailPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { userData, user, testCredentianls } = useContext(UserContext);

  const [trainings, setTrainings] = useState(null);
  const [lastTraining, setLastTraining] = useState(null);
  const [approvedTrainings, setApprovedTrainings] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTrainings = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/users/${userData.id}`, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        resp.status === 200
          ? setTrainings(resp.data.contenido.trainings)
          : null;
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        testCredentianls();
      });
  };
  useEffect(() => {
    getTrainings();
  }, []);

  useEffect(() => {
    if (trainings) {
      setLastTraining(trainings[trainings.length - 1]);
      setApprovedTrainings(trainings.find((training) => training.approvedDate));
    }
  }, [trainings]);

  const getDayTime = () => {
    let hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Buen dia";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    if (hora >= 20) return "Buenas noches";
  };

  if (loading) {
    return (
      <div className="ml-20">
        <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
          {getDayTime()}, {userData.firstname}
        </h1>
        <div className="mx-20 mt-10">
          <Loader></Loader>
        </div>
      </div>
    );
  }

  if (lastTraining && approvedTrainings) {
    return (
      <div className="ml-20">
        <h1>HAY AMBAS</h1>
      </div>
    );
  }

  if (lastTraining && !approvedTrainings) {
    return (
      <div className="ml-20">
        <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
          {getDayTime()}, {userData.firstname}
        </h1>
        <div className="grid grid-cols-2 px-10 pt-6 gap-10">
          <div className="w-full rounded-lg shadow-lg px-6 py-4">
            <div className="flex items-baseline gap-2">
              <BsBell size={28} color="#333" />
              <h2 className="font-bold text-xl mb-2">
                Sobre tu última solicitud pendiente:
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
                  <b>Tu comentario:</b> <span>{lastTraining.userComment}</span>
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
              <Link to={"/solicitudes"} className="bg-teal-400 p-2 rounded-lg">
                Revisá tus peticiones
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trainings) {
    <div className="ml-20">
      <h1 className="text-2xl font-bold ms-4 mt-4 text-dfText">
        {getDayTime()}, {userData.firstname}
      </h1>
      <div className="ml-20 flex justify-center">
        <div className="w-4/6 rounded-lg overflow-hidden shadow-lg px-6 py-4">
          <BsBell size={28} color="#333" />
          <div className="">
            <div className="font-bold text-xl mb-2">
              No tenes solicitudes...
            </div>
            <Link to={"/crearSolicitud"} className="text-gray-700 text-base">
              Crea a una haciendo click acá
            </Link>
          </div>
        </div>
      </div>
    </div>;
  }
};

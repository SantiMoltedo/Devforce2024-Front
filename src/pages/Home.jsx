import React, { useContext, useEffect, useState } from "react";
import { HomeCard } from "../components/HomeCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FolderNotchOpen, Bell, Smiley } from "@phosphor-icons/react";
import bgMisc from "../assets/icons/bg-misc-home.svg";

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
    if (hora >= 5 && hora < 12) return "Buen día";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    if (hora >= 20) return "Buenas noches";
  };

  if (loadingContent) {
    return (
      <>
        <div className="px-10">
          <h1 className="title text-secondary">
            {getDayTime()}, {userData.firstname}
          </h1>
        </div>
        <img className="fixed bottom-0 right-0 z-[-1]" src={bgMisc} alt="" />;
      </>
    );
  }

  if (lastTraining) {
    return (
      <>
        <div className="px-10">
          <h1 className="title mb-8 mt-8 text-secondary">
            {getDayTime()}, {userData.firstname}
          </h1>
          <div className="flex flex-col gap-9">
            <HomeCard
              training={lastTraining}
              icon={<FolderNotchOpen color="#00B4FF" size={24} />}
              title={"Tu última solicitud pendiente"}
            />
            <HomeCard
              title={"Tu última solicitud aprobada"}
              training={approvedTrainings}
              icon={<Bell size={24} color="#00B4FF"></Bell>}
            />
          </div>
        </div>
        <img className="fixed bottom-0 right-0 z-[-1]" src={bgMisc} alt="" />
      </>
    );
  }

  if (!lastTraining) {
    return (
      <>
        <div className="px-10">
          <h1 className="title mb-8 mt-8 text-secondary">
            {getDayTime()}, {userData.firstname}
          </h1>
          <div className="w-1/2 bg-white rounded-[15px] shadow px-6 py-7">
            <div className="flex items-center gap-4 mb-4">
              <Smiley color="#00B4FF" size={24} />
              <h2 className="text-primary font-medium text-[22px]">
                <span>No tenés solicitudes</span>
              </h2>
            </div>
            <Link className="ms-9 button-primary" to={"/create-training"}>
              Crea la primera
            </Link>
          </div>
        </div>
        <img className="fixed bottom-0 right-0 z-[-1]" src={bgMisc} alt="" />
      </>
    );
  }
};

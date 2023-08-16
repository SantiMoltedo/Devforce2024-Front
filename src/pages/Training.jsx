import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BsMicrosoftTeams } from "react-icons/bs";

export const Training = () => {
  let { trainingId } = useParams();
  const {
    userData,
    user,
    testCredentianls,
    loadingContent,
    setLoadingContent,
  } = useContext(UserContext);
  const [training, setTraining] = useState();
  const [link, setLink] = useState();
  const [comment, setComment] = useState();
  const [days, setDays] = useState(30);

  const getTraining = async () => {
    setLoadingContent(true);
    //TODO: Ver en que queda esta vista
    await axios
      .get(`http://localhost:8080/api/v1/trainings/${trainingId}`, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        let ex = resp.data.contenido;

        ex.creationDate = ex.creationDate.slice(0, -16);
        ex.creationDate = `${ex.creationDate.substring(
          8,
          10
        )}-${ex.creationDate.substring(5, 7)}-${ex.creationDate.substring(
          0,
          4
        )}`;
        if (ex.endDate) {
          ex.endDate = ex.endDate.slice(0, -16);
          ex.endDate = `${ex.endDate.substring(8, 10)}-${ex.endDate.substring(
            5,
            7
          )}-${ex.endDate.substring(0, 4)}`;
        }

        if (ex.approvedDate) {
          ex.approvedDate = ex.approvedDate.slice(0, -16);
          ex.approvedDate = `${ex.approvedDate.substring(
            8,
            10
          )}-${ex.approvedDate.substring(5, 7)}-${ex.approvedDate.substring(
            0,
            4
          )}`;
        }

        ex.status = ex.status.replace("_", " ").toLowerCase();

        ex.comments.forEach((comment) => {
          comment.created_at = comment.created_at.slice(0, -16);
          comment.created_at = `${comment.created_at.substring(
            8,
            10
          )}-${comment.created_at.substring(
            5,
            7
          )}-${comment.created_at.substring(0, 4)}`;
        });
        console.log(ex);
        setTraining(ex);
      })
      .catch((err) => {
        console.log(err);
        testCredentianls();
      });
    setLoadingContent(false);
  };

  const modifyTraining = async (id, action) => {
    let body;
    if (userData.role.toLowerCase() == "user") {
      action == "accept"
        ? (body = { status: "PENDIENTE_ADMIN" })
        : (body = { status: "RECHAZADA" });
    }

    if (userData.role.toLowerCase() == "mentor") {
      action == "accept"
        ? (body = { status: "PENDIENTE_USER", comment, link, days })
        : (body = { status: "RECHAZADA", comment });
    }

    if (userData.role.toLowerCase() == "admin") {
      action == "accept"
        ? (body = { status: "APROBADA" })
        : (body = { status: "RECHAZADA" });
    }
    console.log(body);
    axios
      .put(
        `http://localhost:8080/api/v1/trainings/${id}/${userData.role.toLowerCase()}`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: "Bearer " + user.access_token,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        getTraining();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTraining();
  }, []);

  if (training && !loadingContent)
    return (
      <>
        <h1 className="text-3xl font-bold ms-4 mt-4 mb-4 text-dfText text-center">
          {training.title}
        </h1>
        <div className="content px-20">
          <div className="info">
            <h2>Training de área: {training.area.toLowerCase()}</h2>
            {userData.role === "USER" ? null : (
              <h3>
                Ceada por:{" "}
                {training.userId.firstname + training.userId.lastname}
              </h3>
            )}
            <p>
              Estado actual:{" "}
              <span className="capitalize">{training.status}</span>
            </p>
            <p>Creada el: {training.creationDate}</p>
            {training.endDate && <p>Termina el: {training.endDate}</p>}
            <div className="flex gap-1">
              Mentor:{" "}
              {training.mentorId ? (
                <div className="flex gap-1">
                  {training.mentorId.hasTeams && (
                    <a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${training.mentorId.email}`}
                    >
                      <BsMicrosoftTeams
                        size={22}
                        color="#333"
                      ></BsMicrosoftTeams>
                    </a>
                  )}
                  <span>
                    {training.mentorId.firstname + training.mentorId.lastname}
                  </span>
                </div>
              ) : (
                "Aún no hay mentor asignado..."
              )}
            </div>
            <div className="flex gap-1">
              Administrador:{" "}
              {training.adminId ? (
                <div className="flex gap-1">
                  {training.adminId.hasTeams && (
                    <a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${training.adminId.email}`}
                    >
                      <BsMicrosoftTeams
                        size={22}
                        color="#333"
                      ></BsMicrosoftTeams>
                    </a>
                  )}
                  <span>
                    {training.adminId.firstname + training.adminId.lastname}
                  </span>
                </div>
              ) : (
                "Aún no hay administrador asignado..."
              )}
            </div>
            <p>
              Link al curso:{" "}
              {training.link ? (
                <a className="underline" href={training.link}>
                  {training.link}
                </a>
              ) : (
                "Aún no hay link..."
              )}
            </p>
          </div>
          <div className="comments w-1/2 px-10 flex flex-col gap-6">
            {training.comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="comment border border-dfGrey p-4 flex flex-col"
                >
                  <span>{comment.userName}:</span>
                  <span className="ps-2">{comment.message}</span>
                  <span className="">{comment.created_at}</span>
                </div>
              );
            })}
          </div>
          {training.status == `pendiente ${userData.role.toLowerCase()}` && (
            <form
              className="acciones mt-10"
              onSubmit={(ev) => ev.preventDefault()}
            >
              {userData.role == "MENTOR" && (
                <>
                  <label className="w-[500px] flex flex-col justify-between">
                    Comentario:
                    <input
                      type="text"
                      name="comment"
                      value={comment}
                      placeholder="Adjunto el link al curso..."
                      required
                      onChange={(ev) => {
                        setComment(ev.target.value);
                      }}
                    />
                  </label>
                  <label className="w-[500px] flex flex-col justify-between">
                    Link al curso:
                    <input
                      type="text"
                      name="link"
                      value={link}
                      placeholder="https://gire.udemy.com/course/usecases/"
                      required
                      onChange={(ev) => {
                        setLink(ev.target.value);
                      }}
                    />
                  </label>
                  <label className="w-[500px] flex flex-col justify-between">
                    Dias para realizar el curso:
                    <input
                      type="number"
                      name="days"
                      value={days}
                      placeholder=""
                      onChange={(ev) => {
                        setDays(ev.target.value);
                      }}
                    />
                  </label>
                </>
              )}
              <div className="flex justify-around w-[500px]">
                <button
                  className="button-outline"
                  onClick={() => modifyTraining(training.id, "accept")}
                >
                  APROBAR
                </button>
                <button
                  className="button-outline"
                  onClick={() => modifyTraining(training.id, "reject")}
                >
                  RECHAZAR
                </button>
              </div>
            </form>
          )}
        </div>
      </>
    );
};

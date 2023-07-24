import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoMdArrowDown } from "react-icons/io";
import axios from "axios";
import { BsMicrosoftTeams } from "react-icons/bs";

export const MisTrainings = () => {
  //Para q el modal spawnee poner esto en los iconos/columnas q sean
  // data-bs-toggle="modal" data-bs-target="#aprobSoli"

  const [dirSort0, setDirSort0] = useState("asc");
  const [dirSort2, setDirSort2] = useState("asc");

  const [trainings, setTrainings] = useState([]);

  const {
    userData,
    user,
    testCredentianls,
    loadingContent,
    setLoadingContent,
  } = useContext(UserContext);

  const getTrainings = async () => {
    setLoadingContent(true);
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
        setLoadingContent(false);
        console.log(resp.data.contenido.trainings);
      })
      .catch((err) => {
        console.log(err);
        testCredentianls();
        setLoadingContent(false);
      });
  };

  useEffect(() => {
    getTrainings();
  }, []);

  if (loadingContent) {
    return (
      <>
        <h1>aljksdhkjsahd</h1>
      </>
    );
  }
  return (
    <div className="mt-10">
      <div className="w-[90%] mx-auto rounded-lg overflow-hidden">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3">
                <div>Área</div>
              </th>
              <th scope="col" className="py-3">
                <div>Descripción</div>
              </th>
              <th scope="col" className="py-3">
                <div className="">Estado</div>
              </th>
              <th scope="col" className="py-3">
                <div>Mentor</div>
              </th>
              <th scope="col" className="py-3">
                <div>Creada el</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((soli) => (
              <tr key={soli.id} className="bg-white border-b">
                <td scope="col">
                  <span>{soli.area}</span>
                </td>
                <td scope="col">
                  <span>{soli.userComment}</span>
                </td>
                <td scope="col">
                  <span>{soli.status}</span>
                </td>
                <td scope="col">
                  {soli.mentorId ? (
                    <span>
                      {`${soli.mentorId.firstname}, ${soli.mentorId.lastname}`}
                      <BsMicrosoftTeams
                        size={22}
                        color="#333"
                      ></BsMicrosoftTeams>
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td scope="col">
                  <span>{soli.creationDate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { BsMicrosoftTeams, BsUpload, BsPencil } from "react-icons/bs";
import Cropper from "react-easy-crop";
import getCroppedImg from "../helpers/getCroppedImg";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const ProfileInfo = ({ profileUser, profileAvatar }) => {
  const navigate = useNavigate();
  const {
    userData,
    user,
    testCredentianls,
    loadingContent,
    setLoadingContent,
    setAlert,
  } = useContext(UserContext);
  const [img, setImg] = useState();
  const [resultImg, setResultImg] = useState(null);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const maxFileSize = 1024 * 1024; // 1mb

  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstname: profileUser.firstname,
    lastname: profileUser.lastname,
    phone: profileUser.phone,
    email: profileUser.email,
    hasTeams: profileUser.hasTeams,
  });

  //Funciones del img uploader
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file.size);
    if (file.size > maxFileSize) {
      setFileSizeExceeded(true);
      setImg(null);
      return; // do not process the file if it exceeds the size limit
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileSizeExceeded(false);
    };
    setImg(URL.createObjectURL(event.target.files[0]));
    reader.readAsArrayBuffer(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCrop = async () => {
    const croppedImg = await getCroppedImg(img, croppedAreaPixels);
    setResultImg(croppedImg);
    uploadAvatar(croppedImg);
    setImg(null);
  };

  const updateUser = async () => {
    setLoadingContent(true);
    console.log(userInfo);
    axios
      .put("http://localhost:8080/api/v1/users", userInfo, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingContent(false);
        setAlert({
          tipo: "success",
          titulo: "Usuario modificado",
          mensaje: "Modificado exitosamente",
          hidden: false,
        });
        testCredentianls();
      });
  };

  useEffect(() => {
    if (fileSizeExceeded) window.alert("El archivo pasa el maximo de 1mb");
  }, [fileSizeExceeded]);

  const uploadAvatar = async (avatar) => {
    console.log("avatar", avatar);
    await axios
      .post(
        "http://localhost:8080/api/v1/users/avatars/Avatar",
        {
          image: avatar,
        },
        {
          headers: {
            Authorization: "Bearer " + user.access_token,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
    testCredentianls();
  };
  return (
    <>
      <div className="user flex justify-center w-full items-stretch py-8 bg-white">
        <label className="relative h-[25dvh] rounded-full aspect-square bg-dfLight border-dfGreyDark border flex justify-center items-center cursor-pointer me-4">
          {profileUser.id === userData.id && (
            <>
              <div className="avatar-button-img">
                <BsPencil className="" size={20} color="#7D00D2" />
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </>
          )}
          <Avatar avatarb64={profileAvatar} user={profileUser} />
        </label>
        <div className="user-info">
          <div className="flex gap-5 ps-5">
            <div className="w-64 py-3 px-6 border-b border-[#EAEAEA]">
              <span className="font-bold">Nombre</span>

              {editing ? (
                <input
                  type="text"
                  name="firstname"
                  value={userInfo.firstname}
                  onChange={(ev) => {
                    setUserInfo({ ...userInfo, firstname: ev.target.value });
                  }}
                />
              ) : (
                <p className="font-normal">{profileUser.firstname}</p>
              )}
            </div>
            <div className="w-64 py-3 px-6 border-b border-[#EAEAEA]">
              <span className="font-bold">Apellido</span>
              {editing ? (
                <input
                  type="text"
                  name="lastname"
                  value={userInfo.lastname}
                  onChange={(ev) => {
                    setUserInfo({ ...userInfo, lastname: ev.target.value });
                  }}
                />
              ) : (
                <p className="font-normal">{profileUser.lastname}</p>
              )}
            </div>
            <div className="w-64 py-3 px-6 border-b border-[#EAEAEA]">
              <span className="font-bold">Celular</span>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone ? userInfo.phone : ""}
                  onChange={(ev) => {
                    setUserInfo({ ...userInfo, phone: ev.target.value });
                  }}
                />
              ) : (
                <p className="font-normal">{profileUser.phone}</p>
              )}
            </div>
          </div>
          <div className="flex gap-5 ps-5 mt-2">
            <div className="w-64 py-3 px-6 border-b border-[#EAEAEA]">
              <span className="font-bold">Mail</span>
              {editing ? (
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={(ev) => {
                    setUserInfo({ ...userInfo, email: ev.target.value });
                  }}
                />
              ) : (
                <p className="font-normal">{profileUser.email}</p>
              )}
            </div>
            <div
              className={`${
                editing ? "flex flex-col justify-start " : ""
              }w-64 py-3 px-6 border-b border-[#EAEAEA]`}
            >
              <span className="font-bold">Teams</span>
              {editing ? (
                <input
                  type="checkbox"
                  name="hasTeams"
                  className="w-fit"
                  checked={userInfo.hasTeams}
                  onChange={() => {
                    setUserInfo({ ...userInfo, hasTeams: !userInfo.hasTeams });
                  }}
                />
              ) : (
                profileUser.hasTeams && (
                  <div className="flex gap-2">
                    <a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${profileUser.email}`}
                    >
                      <BsMicrosoftTeams
                        size={22}
                        color="#333"
                      ></BsMicrosoftTeams>
                    </a>
                    <p className="font-normal">
                      {profileUser.firstname + " " + profileUser.lastname}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="actions flex gap-4 ps-4">
          {editing ? (
            <>
              <button
                className="button-secondary self-end mt-auto w-full"
                onClick={() => {
                  setEditing(false);
                  setUserInfo({
                    firstname: profileUser.firstname,
                    lastname: profileUser.lastname,
                    phone: profileUser.phone,
                    email: profileUser.email,
                    hasTeams: profileUser.hasTeams,
                  });
                }}
              >
                Cancelar
              </button>
              <button
                className="button-primary self-end w-full"
                onClick={() => {
                  updateUser();
                }}
              >
                Guardar
              </button>
            </>
          ) : (
            profileUser.id === userData.id && (
              <button
                className="button-primary self-end mt-auto"
                onClick={() => setEditing(true)}
              >
                Editar
              </button>
            )
          )}
        </div>
      </div>
      {img && (
        <div className="image-modal">
          <div className="crop-container">
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <div className="controls">
              <div className="inputs">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  className="zoom-range"
                />
                <button className="button-outline" onClick={() => setImg(null)}>
                  Cancel
                </button>
                <button className="button-outline" onClick={onCrop}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

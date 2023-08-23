import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  BsChevronUp,
  BsChevronDown,
  BsMicrosoftTeams,
  BsSearch,
} from "react-icons/bs";
import { sortTable } from "../helpers/sortTable";
import { findSearch } from "../helpers/search";
import { Link } from "react-router-dom";
import axios from "axios";

export const Users = () => {
  const {
    userData,
    user,
    testCredentianls,
    loadingContent,
    setLoadingContent,
  } = useContext(UserContext);

  const [users, setUsers] = useState();
  const [search, setSearch] = useState();

  const getUsers = async () => {
    setLoadingContent(true);
    await axios
      .get("http://localhost:8080/api/v1/users", {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setUsers(resp.data.contenido);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingContent(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!loadingContent && users)
    return (
      <>
        <h1 className="title text-secondary ms-10 mb-8">Todos los usuarios</h1>
        <div className="w-[90%] mx-auto">
          <div className="rounded-lg overflow-hidden border">
            <div className="w-full text-gray-700 uppercase bg-gray-100 p-2 flex justify-between border-b items-center text-sm">
              <div className="flex gap-4">
                <Link className="button-secondary bg-white" to="/create-user">
                  Crear usuario
                </Link>
              </div>
              <label className="relative text-gray-400 focus-within:text-gray-600 block h-fit">
                <BsSearch
                  className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 text-neutral-500"
                  size={16}
                />
                <input
                  type="text"
                  name="search-training"
                  className="form-input w-full bg-white border border-neutral-500 rounded-md p-1 ps-8"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </label>
            </div>
            <table
              className="licences-table w-full text-sm text-left text-gray-500"
              id="user-trainings-table"
            >
              <thead className="text-sm text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col">
                    <div className="flex gap-2 items-center">
                      Usuario
                      <div className="flex flex-col">
                        <button
                          className="hover:text-gray-400 order-table"
                          onClick={(e) => sortTable(0, "asc", e.target)}
                        >
                          <BsChevronUp size={12} />
                        </button>
                        <button
                          className="hover:text-gray-400 order-table"
                          onClick={(e) => sortTable(0, "desc", e.target)}
                        >
                          <BsChevronDown size={12} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <span>Mail</span>
                  </th>
                  <th scope="col">
                    <div className="flex gap-2 items-center">
                      Rol
                      <div className="flex flex-col">
                        <button
                          className="hover:text-gray-400 order-table"
                          onClick={(e) => sortTable(2, "asc", e.target)}
                        >
                          <BsChevronUp size={12} />
                        </button>
                        <button
                          className="hover:text-gray-400 order-table"
                          onClick={(e) => sortTable(2, "desc", e.target)}
                        >
                          <BsChevronDown size={12} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <span>-</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className={`bg-white border-b`}>
                      <td scope="col">
                        <span>{user.firstname + " " + user.lastname}</span>
                      </td>
                      <td scope="col">
                        <div className="flex gap-2">
                          {user.hasTeams && (
                            <a
                              href={`https://teams.microsoft.com/l/chat/0/0?users=${user.email}`}
                            >
                              <BsMicrosoftTeams
                                size={22}
                                color="#333"
                              ></BsMicrosoftTeams>
                            </a>
                          )}
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td scope="col">
                        <span className="ps-2 capitalize">
                          {user.role.toLowerCase()}
                        </span>
                      </td>
                      <td scope="col">
                        <Link
                          to={`/profile/${user.id}`}
                          className="button-secondary"
                        >
                          Ver más
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex justify-start gap-4 items-center">
                        <h1 className="text-lg">
                          Parece que no hay solcitudes...
                        </h1>
                        <Link
                          to={"/create-training"}
                          className="m-2 text-lg button-outline"
                        >
                          Creá una acá
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <img
          className="fixed bottom-0 right-0 z-[-1] w-full"
          src="/src/assets/icons/bg-misc-profile.svg"
          alt=""
        />
      </>
    );
};

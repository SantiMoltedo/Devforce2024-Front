import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./pages/Login";
import { LoggedApp } from "./LoggedApp";
import { Home } from "./pages/Home";

import "./styles/main.css";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setUser(localStorage.getItem("login"));
    }
  }, [user]);

  const UserProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <UserContext.Provider value={UserProviderValue}>
        {user && <Sidebar></Sidebar>}
        <div className="content ml-20">
          <BrowserRouter>
            <Routes>
              {user ? (
                <Route path="/*" element={<Home />} />
              ) : (
                <Route path="/*" element={<Login />} />
              )}
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;

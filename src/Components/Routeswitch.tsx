import React, { useState, createContext, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import SignupFooter from "./SignupFooter";
import { CreateAccountWindow, SignInWindow } from "./AuthWindows";
import Profile from "./Profile";
import Settings from "./Settings";
import Loading from "./Loading";
import uniqid from "uniqid";
import Bookmarks from "./Bookmarks";

export const LogInContext = createContext({
  createWindowOpen: false,
  signIn: false,
  toggleWindow: () => {},
  toggleSignIn: () => {},
  closeWindows: () => {},
});

const RouteSwitch = () => {
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1250);
  }, []);

  const toggleWindow = () => {
    setCreateWindowOpen((prevWindow) => !prevWindow);
  };

  const toggleSignIn = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };

  const closeWindows = () => {
    setSignIn(false);
    setCreateWindowOpen(false);
  };

  return (
    <>
      <LogInContext.Provider
        value={{
          createWindowOpen,
          signIn,
          toggleWindow,
          toggleSignIn,
          closeWindows,
        }}
      >
        <HashRouter>
          {loading ? <Loading /> : null}
          {createWindowOpen && !signIn ? <CreateAccountWindow /> : null}
          {!createWindowOpen && signIn ? <SignInWindow /> : null}
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/bookmarks" element={<Bookmarks />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/:userId"
              element={<Profile key={uniqid()} />}
            />
          </Routes>
          <RightSidebar />
          <SignupFooter />
        </HashRouter>
      </LogInContext.Provider>
    </>
  );
};

export default RouteSwitch;

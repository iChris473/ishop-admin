

import { useState } from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Arrival from "./pages/Arrival";
import Featured from "./pages/Featured";

import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import About from "./pages/About";
import Edit from "./pages/Edit";
import Settings from "./pages/Settings";
import Register from "./pages/Register";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Login />} />
        <Route path="/user" element={ user ? <List /> :  <Login /> } />
        <Route path="/featured" element={ user ? <Featured /> : <Login />} />
        <Route path="/arrival" element={ user ? <Arrival /> :  <Login /> } />
        <Route path={`/new`} element={ user ? <NewProduct /> :  <Login />} />
        <Route path={`/about`} element={ user ? <About /> :  <Login /> } />
        <Route path={`/edit`} element={ user ? <Edit /> :  <Login />}  />
        <Route path={`/login`} element={ user ? <Home /> : <Login /> } />          
        <Route path={`/settings`} element={ user ? <Settings /> : <Login /> } />          
      </Routes>
    </>
  );
}

export default App;

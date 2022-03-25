

import { useState } from "react";
import {

  Routes,
  Route,
  Link
} from "react-router-dom";
import Arrival from "./pages/Arrival";
import Featured from "./pages/Featured";

import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import About from "./pages/About";
import Edit from "./pages/Edit";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<List />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/arrival" element={<Arrival />} />
        <Route path={`/new`} element={<NewProduct />} />
        <Route path={`/about`} element={<About />} />
        <Route path={`/edit`} element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;

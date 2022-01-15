import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Error from "./pages/error/error";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Navbar from './components/navbar/navbar';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

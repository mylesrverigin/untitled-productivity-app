import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Error from "./pages/error/error";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Navbar from './components/navbar/navbar';
import Goals from './pages/goals/goals';
import Tasks from './pages/tasks/tasks';

import env from "react-dotenv";
import { updateVarMap } from './utils/envVars';
console.log('location',window.location.href);
if (window.location.href === 'http://10.0.0.2:8080') {
  updateVarMap('BASE_URL','http://10.0.0.2:8081')
}else {
  updateVarMap('BASE_URL',env.BASE_URL);
}

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/goal' element={<Goals/>} />
          <Route path='/task' element={<Tasks/>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

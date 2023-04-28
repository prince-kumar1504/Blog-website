
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

//components 

import Login from "./component/account/Login";
import DataProvider from './context/DataProvider';
import Home from './component/home/Home'
import Header from './component/header/Header';


function App() {
  return (

    <DataProvider>
      <BrowserRouter>
      <Header/>
      <div style={{ margin: 64 }}>
        <Routes>
        <Route path ='/login'element={ <Login/>} />
        <Route path ='/'element={ <Home/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </DataProvider >

  );
}

export default App;

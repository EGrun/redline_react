import React from "react"
import './home.css'
import DropZone from "./Dropzone"
import SideBar from "./SideBar";
import AdminBar from './AdminBar';

const Home = () => {

  return (
    <div className='home-container'>
      <AdminBar />
      <div className='content'>
        <SideBar />
        <DropZone />
      </div>
    </div>
  );
}
 
export default Home;
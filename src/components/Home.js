import React from "react"
import DropZone from "./Dropzone"
import SideBar from "./SideBar";
import AdminBar from './AdminBar';

const Home = () => {

  const homeContainer = {
    display: 'flex',
    flexFlow: 'wrap',
  }


  return (
    <div style={homeContainer}>
      <SideBar />
      <AdminBar />
      <DropZone />
    </div>
  );
}
 
export default Home;
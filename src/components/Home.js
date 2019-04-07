import React from "react"
import DropZone from "./Dropzone"
import SideBar from "./SideBar";
import AdminBar from './AdminBar';

const Home = () => {

  const homeContainer = {
    display: 'flex',
    flexFlow: 'wrap',
    height: '100vh',
  }

  const content = {
    display: 'flex',
    justifyContent: 'flex-start',
  }

  return (
    <div style={homeContainer}>
      <AdminBar />
      <div style={content}>
        <SideBar />
        <DropZone />
      </div>
    </div>
  );
}
 
export default Home;
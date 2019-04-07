import React from "react"
import DropZone from "./Dropzone"
import SideBar from "./SideBar";

const Home = () => {

  const homeContainer = {
    display: 'flex',
    flexFlow: 'wrap',
  }


  return (
    <div style={homeContainer}>
      <SideBar />
      <DropZone />
    </div>
  );
}
 
export default Home;
import React from 'react';
import TopBar from "@/components/ui/TopBar";
import AddChannel from "../../components/ui/AddChannel";
import Styles_Home from "./HomePage.module.css";
import { Link } from 'react-router-dom'; 
import SettingsBar from '@/components/ui/SettingsBar';


export default function HomePage() {
  
  return (
    <div className={Styles_Home.container1_home}>
      <div className={Styles_Home.container1_LeftSide}>
      <TopBar />
      <AddChannel />
      <SettingsBar/>
      </div>
      <div className={Styles_Home.container1_MiddleSide}>
        <p> HI, message </p>

      </div>
      <div className={Styles_Home.container1_RightSide}>
        


      </div>
      
    </div>
  );
}

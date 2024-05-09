import React from 'react';
import ReactDOM from 'react-dom';
import RightSidebar from '../SettingLeftSide';
import Theme_styles from './Theme.module.css';
import { Link } from 'react-router-dom'; 


function Theme() {

  const handleTheme1Click = () => {
    console.log("Theme 1 selected");
  };

  const handleTheme2Click = () => {
    console.log("Theme 2 selected");
  };

  const handleTheme3Click = () => {
    console.log("Theme 3 selected");
  };


  return (
    <div className={Theme_styles.container1_theme}>
      <RightSidebar/>
      <div className={Theme_styles.theme_section}>
        <div className={Theme_styles.header}>
          <h1 className={Theme_styles.header1}>Theme</h1>
        </div>

        <div className={Theme_styles.theme_rectangles}>

          <div
          className={`${Theme_styles.themeRectangle} ${Theme_styles.theme1}`}
          onClick={handleTheme1Click}
        >
            <span className={Theme_styles.theme_text}>Emerald Whisper</span>
          </div>

          <div
          className={`${Theme_styles.themeRectangle} ${Theme_styles.theme2}`}
          onClick={handleTheme2Click}
        >
            <span className={Theme_styles.theme_text}>Azure Dream</span>
          
          </div>

          <div
            className={`${Theme_styles.themeRectangle} ${Theme_styles.theme3}`}
            onClick={handleTheme3Click}
          >
            <span className={Theme_styles.theme_text}>Mystic Violet</span>
            
          </div>

        </div>

      </div>

    </div>
    
  );
}

export default Theme;
import React, { useContext } from 'react';
import RightSidebar from '../SettingLeftSide';
import Theme_styles from './Theme.module.css';
import { ThemeContext } from "../../../contexts/ThemeContext.jsx"

function Theme() {
  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  const handleTheme1Click = () => {
    toggleTheme("emerald_whisper")
    console.log("Theme \"emerald whisper\" selected");
  };

  const handleTheme2Click = () => {
    toggleTheme("azure_dream")
    console.log("Theme \"azure dream\" selected");
  };

  const handleTheme3Click = () => {
    toggleTheme("mystic_violet")
    console.log("Theme \"mystic violet\" selected");
  };

  return (
    <div className={Theme_styles.container1_theme}>
      <RightSidebar/>
      <div className={Theme_styles.theme_section}>
        <div className={Theme_styles.header} style={{ background: theme.bgd }}>
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

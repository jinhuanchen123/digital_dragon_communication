import React, { useContext } from 'react';
import RightSidebar from '../SettingLeftSide';
import Theme_styles from './Theme.module.css';
import { ThemeContext } from "../../../contexts/ThemeContext.jsx"

import { auth, db } from "../../../pages/Firebase/firebase.ts"
import { User } from 'firebase/auth'
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';



const updateTheme = async (newTheme: string) =>{

  const user: User | null = auth.currentUser;


  if (user && user.email){
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", user.email));

    try{
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty){
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        console.log("Current theme: ", docSnapshot.data().userTheme); 

        await updateDoc(doc(db, "users", docSnapshot.id), {
          userTheme: newTheme
        });
        console.log("Theme updated to: ", newTheme);
      });
    } catch (error) {
      console.error("Error updating theme: ", error instanceof Error ? error.message : "Unknown error");
    }
  } else {
    console.log("No user logged in or email is missing");
  }
};


function Theme() {
  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  const handleTheme1Click = () => {
    toggleTheme("emerald_whisper")
    updateTheme("emerald_whisper") //update the userTheme Selection on firebase
    console.log("Theme \"emerald whisper\" selected");
  };

  const handleTheme2Click = () => {
    toggleTheme("azure_dream")
    updateTheme("azure_dream") //update the userTheme Selection on firebase
    console.log("Theme \"azure dream\" selected");
  };

  const handleTheme3Click = () => {
    toggleTheme("mystic_violet")
    updateTheme("mystic_violet") //update the userTheme Selection on firebase
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

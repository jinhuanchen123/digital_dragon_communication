import Home_Styles from "./HomePage.module.css";
import React from "react";
import {ref, onValue } from 'firebase/database';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc, serverTimestamp, DocumentSnapshot, getDoc ,addDoc} from 'firebase/firestore';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
} from "firebase/firestore";

export default function MembersBar(props) {

// const docRef = doc(db, 'cities', 'SF');
// const docSnap = await getDoc(docRef)

    return (
        <div id={Home_Styles.membersBar}>
            
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Stefin</h1>
            </div>
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Gabriel</h1>
            </div>
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Daniel Juan Galvez</h1>
            </div>
            
        </div>
    )
}
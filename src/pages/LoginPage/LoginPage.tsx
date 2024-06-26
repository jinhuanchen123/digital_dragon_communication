import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, googleProvider, db } from "../../firebase.ts";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, Firestore , getDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

interface FormData {
  signUpName: string;
  signUpEmail: string;
  signUpPassword: string;
  signInEmail: string;
  signInPassword: string;
  profilePictureUrl:string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);

  const showLogin = () => setIsActive(false);
  const showSignup = () => setIsActive(true);

  const [formData, setFormData] = useState<FormData>({
    signUpName: "",
    signUpEmail: "",
    signUpPassword: "",
    signInEmail: "",
    signInPassword: "",
    profilePictureUrl:""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const signUp = async (db: Firestore, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.signUpEmail,
        formData.signUpPassword
      );

      // Update user's profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.signUpName
      });

      // Update Firestore document with user's display name
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: formData.signUpName,
        email: formData.signUpEmail,
        createdAt: new Date().toISOString(),
        profilePictureUrl:""

      });

      setIsSignUpError(false);
      navigate("/");
    } catch (err) {
      setIsSignUpError(true);
      console.error(err);
    }
  }
  const fetchData = async () => {
    const [userData, setUserData] = useState<any[]>([]);
    try {
      // Fetch user data from Firestore
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        setUserData([docSnapshot.data()]);
      } else {
        console.log("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.signInEmail,
        formData.signInPassword
      );
      setIsSignInError(false);
      fetchData();
      console.log("Signed In!", userCredential);
    
    } catch (err) {
      setIsSignInError(true);
      console.error(err);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setIsSignInError(true);
      fetchData();
      console.error(err);
    }
  }

  return (
    <div className={style.fullWrapper}>
      <div
        className={`${style.container} ${isActive ? style.active : ""}`}
        id="container"
      >
        {/* Sign Up Section */}
        <div className={`${style.formContainer} ${style.signUp}`}>
          <form onSubmit={(e) => signUp(db, e)}>
            <h1 className={style.formHeading}>Create Account</h1>

            {/* Social Icons */}
            <div className={style.socialIcons}>
              <button onClick={signInWithGoogle} className={style.icon}>
                {<FontAwesomeIcon icon={faGoogle} />}
              </button>
            </div>

            <span>or use your email for registration</span>

            {/* Input Fields */}
            <input
              name="signUpName"
              type="text"
              onChange={handleChange}
              value={formData.signUpName}
              minLength={3}
              placeholder="Name"
              required
            />
            <input
              name="signUpEmail"
              type="email"
              onChange={handleChange}
              value={formData.signUpEmail}
              placeholder="Email"
              required
            />
            <input
              name="signUpPassword"
              type="password"
              onChange={handleChange}
              value={formData.signUpPassword}
              minLength={6}
              placeholder="Password"
              required
            />

            {/* Sign Up Button */}
            <button>Sign Up</button>
            {isSignUpError && (
              <span className={style.error}>Invalid Credentials</span>
            )}
          </form>
        </div>

        {/* Sign In Section */}
         {/* Sign In Section */}
         <div className={`${style.formContainer} ${style.signIn}`}>
          <form onSubmit={signIn}>
            <h1 className={style.formHeading}>Sign In</h1>

            {/* Social Icons */}
            <div className={style.socialIcons}>
              <button onClick={signInWithGoogle} className={style.icon}>
                {<FontAwesomeIcon icon={faGoogle} />}
              </button>
            </div>

            <span>or use your email password</span>

            {/* Input Fields */}
            <input
              name="signInEmail"
              type="email"
              onChange={handleChange}
              value={formData.signInEmail}
              placeholder="Email"
              required
            />
            <input
              name="signInPassword"
              type="password"
              onChange={handleChange}
              value={formData.signInPassword}
              placeholder="Password"
              required
            />

            {/* Forgot Password Link */}
            <a href="#">Forgot Your Password?</a>

            {/* Sign In Button */}
            <button>Sign In</button>
            {isSignInError && (
              <span className={style.error}>Invalid Credentials</span>
            )}
          </form>
        </div>

        {/* Toggle Section */}
        <div className={style.toggleContainer}>
          <div className={style.toggle}>
            {/* <div className="toggle-panel toggle-left"> */}
            <div
              className={`${style.togglePanel} ${style.toggleLeft}`}
              onClick={showLogin}
            >
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className={style.hidden} id="login">
                Sign In
              </button>
            </div>

            {/* <div className="toggle-panel toggle-right"> */}
            <div
              className={`${style.togglePanel} ${style.toggleRight}`}
              onClick={showSignup}
            >
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button className={style.Hidden} id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
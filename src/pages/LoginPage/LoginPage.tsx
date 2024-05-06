import { ChangeEvent, FormEvent, useState } from "react";
import style from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, googleProvider } from "../../firebase.ts";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [isPasswordResetError, setIsPasswordResetError] = useState(false);

  const showLogin = () => setIsActive(false);
  const showSignup = () => setIsActive(true);

  const [formData, setFormData] = useState({
    signUpName: "",
    signUpEmail: "",
    signUpPassword: "",
    signInEmail: "",
    signInPassword: "",
  });


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.signUpEmail,
        formData.signUpPassword,
      );
      await updateProfile(userCredentials.user, {
        displayName: formData.signUpName,
      });
      setIsSignUpError(false);

      navigate("/");
    } catch (err) {
      setIsSignUpError(true);
      console.error(err);
    }
  }



  async function signIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.signInEmail,
        formData.signInPassword,
      );
      setIsSignInError(false);

 
 
      navigate("/");
    } catch (err) {
      setIsSignInError(true);
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setIsSignInError(true);
      console.error(err);
    }
  }

  async function onForgotPassword() {
    try {
      await sendPasswordResetEmail(auth, formData.signInEmail);
      setIsPasswordResetError(false);
      alert("Email has been sent to reset your password.");
    } catch (err) {
      setIsPasswordResetError(true);
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
          <form onSubmit={signUp}>
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
            />

            {/* Forgot Password Link */}
            <button onClick={onForgotPassword} className={style.forgotPassword}>
              Forgot Your Password?
            </button>
            {isPasswordResetError && (
              <span className={style.error}>
                Enter an email to reset your password.
              </span>
            )}

            {/* Sign In Button */}
            <button type="submit">Sign In</button>
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
              <p>
                Register with your personal details to use all site features
              </p>
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

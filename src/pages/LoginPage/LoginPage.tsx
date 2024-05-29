import { ChangeEvent, FormEvent, useState, useContext } from "react";
import style from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { db, auth, googleProvider } from "../Firebase/firebase.ts";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

interface FormData {
  signUpName: string;
  signUpEmail: string;
  signUpPassword: string;
  signInEmail: string;
  signInPassword: string;
  signUpProfileLink:string;
}

export default function LoginPage() {
  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

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
    signUpProfileLink: "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png",
    signInEmail: "",
    signInPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.signUpEmail,
        formData.signUpPassword,
      
      );

      // Update user's profile with display name and photo URL
      await updateProfile(userCredential.user, {
        displayName: formData.signUpName,
        photoURL: "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png",
      });

      // Create Firestore document for the user
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: formData.signUpName,
        email: formData.signUpEmail,
        createdAt: serverTimestamp(),
        profilePictureUrl: formData. signUpProfileLink,
        userTheme: "mystic_violet",
      });

      setIsSignUpError(false);
      navigate("/");
    } catch (err) {
      setIsSignUpError(true);
      console.error(err);
    }
  };

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.signInEmail,
        formData.signInPassword,
      );
      setIsSignInError(false);
      console.log("Signed In!", userCredential);
      navigate("/");
    } catch (err) {
      setIsSignInError(true);
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setIsSignInError(true);
      console.error(err);
    }
  };

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
              <button
                onClick={signInWithGoogle}
                className={style.icon}
                style={{ background: theme.bgd }}
              >
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
            <button style={{ background: theme.bgd }}>Sign Up</button>
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
              <button
                onClick={signInWithGoogle}
                className={style.icon}
                style={{ background: theme.bgd }}
              >
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
            <button style={{ background: theme.bgd }}>Sign In</button>
            {isSignInError && (
              <span className={style.error}>Invalid Credentials</span>
            )}
          </form>
        </div>

        {/* Toggle Section */}
        <div className={style.toggleContainer}>
          <div className={style.toggle} style={{ background: theme.bgd }}>
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

            <div
              className={`${style.togglePanel} ${style.toggleRight}`}
              onClick={showSignup}
            >
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all site features
              </p>
              <button
                className={style.hidden}
                id="register"
                style={{ background: theme.bgd }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
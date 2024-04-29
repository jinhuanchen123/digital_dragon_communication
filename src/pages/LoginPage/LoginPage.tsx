// import React, { useState } from 'react';
// import styles from './LoginPage.css';

// const FormComponent: React.FC = () => {
//     const [isActive, setIsActive] = useState<boolean>(false);

//     return (
//         <div className={isActive ? `${styles.container} ${styles.active}` : styles.container}>
//             <div className={`${styles.formContainer} ${styles.signUp}`}>
                
//                 <form>
//                     <h1>
//                       Create Account
//                     </h1>

//                     <div className={styles.socialIcons}>
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-google"></i></a>
                        
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-facebook"></i></a>
                        
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-microsoft"></i></a>
//                     </div>

//                     <span>
//                       or use your email for registration
//                     </span>
                    
//                     <input type="text" placeholder="Name" />
                    
//                     <input type="email" placeholder="Email" />
                    
//                     <input type="password" placeholder="Password" />
                    
//                     <button type="button">
//                       Sign Up
//                     </button>
//                 </form>
//             </div>

//             <div className={`${styles.formContainer} ${styles.signIn}`}>
//                 <form>
//                     <h1>
//                       Sign In
//                     </h1>

//                     <div className={styles.socialIcons}>
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-google"></i></a>
                        
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-facebook"></i></a>
                        
//                         <a href="#" className={styles.icon}><i className="fa-brands fa-microsoft"></i></a>
//                     </div>

//                     <span>
//                       or use your email password
//                     </span>

//                     <input type="email" placeholder="Email" />
                    
//                     <input type="password" placeholder="Password" />
                    
//                     <a href="#">Forget Your Password?</a>
                    
//                     <button type="button">
//                       Sign In
//                     </button>
//                 </form>
//             </div>

//             <div className={styles.toggleContainer}>
//                 <div className={styles.toggle}>

//                     <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
//                         <h1>
//                           Welcome Back!
//                         </h1>

//                         <p>
//                           Enter your personal details and start journey with us
//                         </p>

//                         <button className={styles.hidden} onClick={() => setIsActive(false)}>
//                           Sign In
//                         </button>
//                     </div>

//                     <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
//                         <h1>
//                           Hello, Friend!
//                         </h1>
//                         <p>Enter your personal details and start your journey with us</p>
//                         <button className={styles.hidden} onClick={() => setIsActive(true)}>Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FormComponent;


import'./LoginPage.css'; // Import your CSS file for styling if needed

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle, faFacebookF, faGithub } from '@fortawesome/free-solid-svg-icons';
export default function LoginPage() {
  return (
    <div className="container" id="container">
      {/* Sign Up Section */}
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="#" className="icon">
              {/* <FontAwesomeIcon icon={faGoogle} /> */}
             
              
            </a>
            <a href="#" className="icon">
              {/* <FontAwesomeIcon icon={faFacebookF} /> */}
            </a>
            <a href="#" className="icon">
              {/* <FontAwesomeIcon icon={faGithub} /> */}
            </a>
            <a href="#" className="icon">
              
            </a>
          </div>

          <span>or use your email for registration</span>

          {/* Input Fields */}
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          {/* Sign Up Button */}
          <button>Sign Up</button>
        </form>
      </div>

      {/* Sign In Section */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-microsoft"></i>
            </a>
          </div>

          <span>or use your email password</span>

          {/* Input Fields */}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          {/* Forgot Password Link */}
          <a href="#">Forgot Your Password?</a>

          {/* Sign In Button */}
          <button>Sign In</button>
        </form>
      </div>

      {/* Toggle Section */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" id="login">Sign In</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
  
    </div>
  );
}

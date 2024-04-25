import React, { useState } from 'react';
import styles from './LoginPage.css';

const FormComponent: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div className={isActive ? `${styles.container} ${styles.active}` : styles.container}>
            <div className={`${styles.formContainer} ${styles.signUp}`}>
                
                <form>
                    <h1>
                      Create Account
                    </h1>

                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-google"></i></a>
                        
                        <a href="#" className={styles.icon}><i className="fa-brands fa-facebook"></i></a>
                        
                        <a href="#" className={styles.icon}><i className="fa-brands fa-microsoft"></i></a>
                    </div>

                    <span>
                      or use your email for registration
                    </span>
                    
                    <input type="text" placeholder="Name" />
                    
                    <input type="email" placeholder="Email" />
                    
                    <input type="password" placeholder="Password" />
                    
                    <button type="button">
                      Sign Up
                    </button>
                </form>
            </div>

            <div className={`${styles.formContainer} ${styles.signIn}`}>
                <form>
                    <h1>
                      Sign In
                    </h1>

                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-google"></i></a>
                        
                        <a href="#" className={styles.icon}><i className="fa-brands fa-facebook"></i></a>
                        
                        <a href="#" className={styles.icon}><i className="fa-brands fa-microsoft"></i></a>
                    </div>

                    <span>
                      or use your email password
                    </span>

                    <input type="email" placeholder="Email" />
                    
                    <input type="password" placeholder="Password" />
                    
                    <a href="#">Forget Your Password?</a>
                    
                    <button type="button">
                      Sign In
                    </button>
                </form>
            </div>

            <div className={styles.toggleContainer}>
                <div className={styles.toggle}>

                    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                        <h1>
                          Welcome Back!
                        </h1>

                        <p>
                          Enter your personal details and start journey with us
                        </p>

                        <button className={styles.hidden} onClick={() => setIsActive(false)}>
                          Sign In
                        </button>
                    </div>

                    <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                        <h1>
                          Hello, Friend!
                        </h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className={styles.hidden} onClick={() => setIsActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormComponent;
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container} id="container">
      {/* Sign Up Section */}
      <div className={`${styles['form-container']} ${styles['sign-up']}`}>
        <form>
          <h1>Create Account</h1>

          {/* Social Icons */}
          <div className={styles['social-icons']}>
            <a href="#" className={styles.icon}>
              {/* Icon content */}
            </a>
            {/* Add other social icons here */}
          </div>

          <span>or use your email for registration</span>

          {/* Input Fields */}
          {/* Add input fields here */}

          {/* Sign Up Button */}
          <button>Sign Up</button>
        </form>
      </div>

      {/* Sign In Section */}
      <div className={`${styles['form-container']} ${styles['sign-in']}`}>
        <form>
          <h1>Sign In</h1>

          {/* Social Icons */}
          <div className={styles['social-icons']}>
            {/* Add social icons here */}
          </div>

          <span>or use your email password</span>

          {/* Input Fields */}
          {/* Add input fields here */}

          {/* Forgot Password Link */}
          <a href="#">Forgot Your Password?</a>

          {/* Sign In Button */}
          <button>Sign In</button>
        </form>
      </div>

      {/* Toggle Section */}
      <div className={styles['toggle-container']}>
        <div className={styles.toggle}>
          <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className={styles.hidden} id="login">Sign In</button>
          </div>

          <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className={styles.hidden} id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { createContext, Component } from "react";

// export const ThemeContext = createContext();

// class ThemeContextProvider extends Component {
//   state = {
//     currentTheme: "mystic_violet",
//     themes: {
//       emerald_whisper: {
//         syntax: "#555",
//         ui: "#ddd",
//         bg: "#eee",
//         bgd: "linear-gradient(to right, #66cdaa, #006400)",
//       },
//       azure_dream: {
//         syntax: "#ddd",
//         ui: "#333",
//         bg: "#555",
//         bgd: "linear-gradient(to right, #87cefa, #4682b4)",
//       },
//       mystic_violet: {
//         syntax: "#ff0000",
//         ui: "#00ff00",
//         bg: "#0000ff",
//         bgd: "linear-gradient(to right, #483d8b, #6a5acd)",
//       },
//     },
//   };

//   toggleTheme = (themeName) => {
//     this.setState({ currentTheme: themeName });
//   };

//   render() {
//     return (
//       <ThemeContext.Provider
//         value={{
//           currentTheme: this.state.currentTheme,
//           themes: this.state.themes,
//           toggleTheme: this.toggleTheme,
//         }}
//       >
//         {this.props.children}
//       </ThemeContext.Provider>
//     );
//   }
// }

// export default ThemeContextProvider;

/// below code works

// import React, { Component } from "react";
// import { createContext } from "react";
// import { auth } from "../firebase"; // Adjust based on your setup
// import { doc, onSnapshot, getFirestore } from "firebase/firestore";

// export const ThemeContext = createContext();

// class ThemeContextProvider extends Component {
//   state = {
//     currentTheme: "mystic_violet", // Default theme
//     themes: {
//       emerald_whisper: {
//         syntax: "#555",
//         ui: "#ddd",
//         bg: "#eee",
//         bgd: "linear-gradient(to right, #66cdaa, #006400)",
//       },
//       azure_dream: {
//         syntax: "#ddd",
//         ui: "#333",
//         bg: "#555",
//         bgd: "linear-gradient(to right, #87cefa, #4682b4)",
//       },
//       mystic_violet: {
//         syntax: "#ff0000",
//         ui: "#00ff00",
//         bg: "#0000ff",
//         bgd: "linear-gradient(to right, #483d8b, #6a5acd)",
//       },
//     },
//   };

//   componentDidMount() {
//     this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
//       if (user) {
//         this.fetchAndListenForUserTheme(user);
//       } else {
//         this.setState({ currentTheme: "mystic_violet" });
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.unregisterAuthObserver(); // Unregister authentication listener
//     if (this.unsubscribeFromTheme) {
//       this.unsubscribeFromTheme(); // Unsubscribe from theme listener
//     }
//   }

//   fetchAndListenForUserTheme = (user) => {
//     const db = getFirestore();
//     const userRef = doc(db, "users", user.uid);
//     this.unsubscribeFromTheme = onSnapshot(
//       userRef,
//       (docSnap) => {
//         if (docSnap.exists()) {
//           const userTheme = docSnap.data().userTheme; // Ensure the field name matches
//           if (userTheme && this.state.themes[userTheme]) {
//             this.setState({ currentTheme: userTheme });
//           } else {
//             console.log("User theme not found or undefined in states");
//           }
//         } else {
//           console.log("No such document!");
//         }
//       },
//       (error) => {
//         console.error("Error listening to user theme:", error);
//       }
//     );
//   };

//   toggleTheme = (themeName) => {
//     this.setState({ currentTheme: themeName });
//   };

//   render() {
//     return (
//       <ThemeContext.Provider
//         value={{
//           currentTheme: this.state.currentTheme,
//           themes: this.state.themes,
//           toggleTheme: this.toggleTheme,
//         }}
//       >
//         {this.props.children}
//       </ThemeContext.Provider>
//     );
//   }
// }

// export default ThemeContextProvider;

// below is a code solving initial default theme

// import React, { Component } from "react";
// import { createContext } from "react";
// import { auth } from "../firebase"; // Ensure this imports auth correctly
// import { doc, onSnapshot, getFirestore } from "firebase/firestore";

// export const ThemeContext = createContext({
//   currentTheme: "mystic_violet",
//   themes: {},
//   toggleTheme: () => {},
// });

// class ThemeContextProvider extends Component {
//   state = {
//     currentTheme: "mystic_violet", // Initial default theme
//     themes: {
//       emerald_whisper: {
//         syntax: "#555",
//         ui: "#ddd",
//         bg: "#eee",
//         bgd: "linear-gradient(to right, #66cdaa, #006400)",
//       },
//       azure_dream: {
//         syntax: "#ddd",
//         ui: "#333",
//         bg: "#555",
//         bgd: "linear-gradient(to right, #87cefa, #4682b4)",
//       },
//       mystic_violet: {
//         syntax: "#ff0000",
//         ui: "#00ff00",
//         bg: "#0000ff",
//         bgd: "linear-gradient(to right, #483d8b, #6a5acd)",
//       },
//     },
//     isThemeLoaded: false, // Indicates whether the theme is loaded
//   };

//   componentDidMount() {
//     this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
//       if (user) {
//         this.fetchAndListenForUserTheme(user);
//       } else {
//         this.setState({ currentTheme: "mystic_violet", isThemeLoaded: true });
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.unregisterAuthObserver(); // Unregister authentication listener
//     if (this.unsubscribeFromTheme) {
//       this.unsubscribeFromTheme(); // Unsubscribe from theme listener
//     }
//   }

//   fetchAndListenForUserTheme = (user) => {
//     const db = getFirestore();
//     const userRef = doc(db, "users", user.uid);
//     this.unsubscribeFromTheme = onSnapshot(
//       userRef,
//       (docSnap) => {
//         if (docSnap.exists()) {
//           const userTheme = docSnap.data().userTheme;
//           if (userTheme && this.state.themes[userTheme]) {
//             this.setState({ currentTheme: userTheme, isThemeLoaded: true });
//           } else {
//             console.log("User theme not found or undefined in states");
//             this.setState({ isThemeLoaded: true });
//           }
//         } else {
//           console.log("No such document!");
//           this.setState({ isThemeLoaded: true });
//         }
//       },
//       (error) => {
//         console.error("Error listening to user theme:", error);
//         this.setState({ isThemeLoaded: true });
//       }
//     );
//   };

//   toggleTheme = (themeName) => {
//     this.setState({ currentTheme: themeName });
//   };

//   render() {
//     if (!this.state.isThemeLoaded) {
//       return <div>Loading page...</div>; // Or show a loader/spinner here
//     }
//     return (
//       <ThemeContext.Provider
//         value={{
//           currentTheme: this.state.currentTheme,
//           themes: this.state.themes,
//           toggleTheme: this.toggleTheme,
//         }}
//       >
//         {this.props.children}
//       </ThemeContext.Provider>
//     );
//   }
// }

// export default ThemeContextProvider;

// below is another attempt to solve problem

import React, { Component } from "react";
import { createContext } from "react";
import { auth } from "../firebase"; // Make sure this path matches your Firebase setup
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import dragonImage from "../pages/SettingsPage/dragon_no_bg.png"; // Relative path from RightSidebar.tsx

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    currentTheme: "mystic_violet", // Default theme, initially
    themes: {
      emerald_whisper: {
        syntax: "#555",
        ui: "#ddd",
        bg: "#eee",
        bgd: "linear-gradient(to right, #66cdaa, #006400)",
      },
      azure_dream: {
        syntax: "#ddd",
        ui: "#333",
        bg: "#555",
        bgd: "linear-gradient(to right, #87cefa, #4682b4)",
      },
      mystic_violet: {
        syntax: "#ff0000",
        ui: "#00ff00",
        bg: "#0000ff",
        bgd: "linear-gradient(to right, #483d8b, #6a5acd)",
      },
    },
    isThemeLoaded: false, // Indicates that the theme has not been loaded yet
  };

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchAndListenForUserTheme(user);
      } else {
        this.setState({ currentTheme: "mystic_violet", isThemeLoaded: true });
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver(); // Unregister authentication listener
    if (this.unsubscribeFromTheme) {
      this.unsubscribeFromTheme(); // Unsubscribe from theme listener
    }
  }

  fetchAndListenForUserTheme = (user) => {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    this.unsubscribeFromTheme = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userTheme = docSnap.data().userTheme;
          if (userTheme && this.state.themes[userTheme]) {
            this.setState({ currentTheme: userTheme, isThemeLoaded: true });
          } else {
            console.log("User theme not found or undefined in states");
            this.setState({ isThemeLoaded: true });
          }
        } else {
          console.log("No such document!");
          this.setState({ isThemeLoaded: true });
        }
      },
      (error) => {
        console.error("Error listening to user theme:", error);
        this.setState({ isThemeLoaded: true });
      }
    );
  };

  toggleTheme = (themeName) => {
    this.setState({ currentTheme: themeName });
  };

  render() {
    if (!this.state.isThemeLoaded) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            src={dragonImage}
            alt="Loading..."
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      );
    }
    return (
      <ThemeContext.Provider
        value={{
          currentTheme: this.state.currentTheme,
          themes: this.state.themes,
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;

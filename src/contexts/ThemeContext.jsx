import React, { createContext, Component } from "react";

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    currentTheme: "mystic_violet",
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
  };

  toggleTheme = (themeName) => {
    this.setState({ currentTheme: themeName });
  };

  render() {
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

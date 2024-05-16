import { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Define the type for the AuthContext value
type AuthContextType = User | null;

// Create the AuthContext with a default value of null
export const AuthContext = createContext<AuthContextType>(null);

// Define the props type for AuthContextProvider
type AuthContextProviderProps = {
  children: ReactNode; // Explicitly type children as ReactNode
};

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType>(null);

  useEffect(() => {
    const auth = getAuth(); // Get the auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userName, setUserName] = useState(null);

    const logout = () => {
        // Clear token and user's name on logout
        setAuthToken(null);
        setUserName(null);
        // Add API call here to actually log out from the server
        // Example: performLogout(authToken);
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, userName, setUserName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

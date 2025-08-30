"use client"
const { useContext, createContext, useState } = require("react");

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [isLoginPageInWidow , setIsLoginPageInWidow] = useState(true);

    return <AuthContext.Provider value={{isLoginPageInWidow , setIsLoginPageInWidow}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>useContext(AuthContext);
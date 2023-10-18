import { createContext, useEffect, useState } from "react";
import { signInUser, signinAuth } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const handleLogin = async (email, password) => {
    setAuthInfo((prevAuthInfo) => ({
      ...prevAuthInfo,
      isPending: true,
    }));
    const { error, user } = await signInUser({ email, password });
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", {replace: true})
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
    localStorage.setItem("auth-token", user.token);
    // handleLogout, isAuth
  };

  const isAuth =async () => {
    const token = localStorage.getItem("auth-token");
    // console.log(token)
    if(!token) return;

    setAuthInfo({ ...authInfo, isPending: true })
   const {error, user} = await signinAuth(token);
   if(error){
    return setAuthInfo({...authInfo, isPending: false, error})
   }
    
   setAuthInfo({
    profile: { ...user },
    isPending: false,
    isLoggedIn: true,
    error: "",
  });
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({...defaultAuthInfo})
  }

  useEffect(() => {
    isAuth()
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

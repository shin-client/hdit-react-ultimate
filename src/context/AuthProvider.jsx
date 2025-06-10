import { getUserInfoAPI } from "@services/apiService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  });

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      const fetchUserInfo = async () => {
        const res = await getUserInfoAPI();
        if (res.data) {
          setUserInfo(res.data.user);
          setIsAuthenticated(true);
        }
      };
      fetchUserInfo();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router";
import { useAuthContext } from "@context/AuthProvider";
import { useEffect } from "react";
import { getUserInfoAPI } from "@services/apiService";
import Loading from "@components/Loading";

function App() {
  const { isAppLoading, setUserInfo, setIsAuthenticated, setIsAppLoading } =
    useAuthContext();

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      const fetchUserInfo = async () => {
        const res = await getUserInfoAPI();
        if (res.data) {
          setUserInfo(res.data.user);
          setIsAuthenticated(true);
          setIsAppLoading(false);
        }
      };
      fetchUserInfo();
    } else setIsAppLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {isAppLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

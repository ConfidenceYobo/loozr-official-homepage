import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Player from "./components/song/Player/Player";
import Footer from "./components/Footer";
// import WaitlistModal from "./components/WaitlistModal";
import AppLayout from "./components/Layout/App";
import { authRoutes, dashboard, dashboardhome, routes } from "./router/routes";
import Dashboard from "./components/Layout/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./state/user/userActions";
import { AppState } from "./state/store";
import RequireAuth, { AccountSetupCheckOnly } from "./containers/RequireAuth";
import { parseJwt } from "./utils/index";
import FullpageLoader from "./components/loaders/FullpageLoader";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import NFTModal from "./components/NftModal";

const NotFound = () => (
  <div className="main-content">
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

const App = () => {
  const { jwtToken } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwtToken) {
      const decodedJwt = parseJwt(jwtToken);
      dispatch(getUserDetails(decodedJwt.id));
    }
  }, [jwtToken, dispatch]);

  const [isModal, setIsModal] = useState(true)

  return (
    <>
      <FullpageLoader />
      <ToastContainer />
      <Router>
        <div id="preloader"></div>
        <div className="progress-wrap cursor-pointer">
          <svg
            className="progress-circle svg-content"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
        <div className="mouse-cursor cursor-outer"></div>
        <div className="mouse-cursor cursor-inner"></div>

        <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas >
          {/* <WaitlistModal /> */}
          
            <>
              <Routes>
                {authRoutes.map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={
                      <>
                        <route.component />
                        {/* {route.name !== "songTokenization" && <Footer />}
                    {route.name === "login" || 'signup' && <Footer />} */}
                      </>
                    }
                  />
                ))}
                {routes.map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={
                      <AppLayout>
                        <route.component />
                        <Footer />
                      </AppLayout>
                    }
                  />
                ))}
                {dashboardhome.map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={
                      <AccountSetupCheckOnly>
                        <Dashboard>
                          <route.component />
                        </Dashboard>
                      </AccountSetupCheckOnly>
                    }
                  />
                ))}
                {dashboard.map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={
                      <RequireAuth>
                        <Dashboard>
                          <route.component />
                        </Dashboard>
                      </RequireAuth>
                    }
                  />
                ))}
                <Route path="*" element={NotFound} />
              </Routes>
              <Player />
              <MusicPlayer />
              <a href="#focused" id="focus-link" hidden>
                Go to playing element
              </a>
            </>
        </div>
      </Router>
    </>
  );
};

export default App;

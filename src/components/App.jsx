import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsRefreshing,
  selectServerStatus,
  selectToken,
  selectIsRefreshDone,
} from "../redux/auth/selectors";
import { selectIsLoading } from "../redux/contacts/selectors";
import { ServerError } from "../pages/ServerError/ServerError";
import {
  oauthLoginWithGoogle,
  refreshToken,
  refreshUser,
  oauthLoginWithGithub,
  checkHealth,
} from "../redux/auth/operations";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { Route, Routes } from "react-router-dom";
import { OAuthHandler } from "./OAuthHandler";
import { SpinnerLoading } from "../components/SpinnerLoading/SpinnerLoading";
import { Toaster } from "react-hot-toast";
import { AppBar } from './AppBar/AppBar';
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage.jsx"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage.jsx"));
const SetPasswordPage = lazy(() => import("../pages/SetPasswordPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);
  const serverStatus = useSelector(selectServerStatus);
  const refreshDone = useSelector(selectIsRefreshDone);



  useEffect(() => {
    dispatch(checkHealth());
  }, [dispatch]);

  useEffect(() => {
    if (serverStatus === "ok") {
      if (token) {
        dispatch(refreshUser());
      }
      const refreshEndpoints = ["/login", "/", "/register", "/forgot-password"];
      const currentPath = window.location.pathname;

      if (token === null && refreshEndpoints.includes(currentPath)) {
        dispatch(refreshToken());
      }
    }
  }, [serverStatus, dispatch, token]);
  if (serverStatus === "checking" || serverStatus === "idle" || (refreshDone === "idle" && token) || refreshDone==="pending") {
    return <SpinnerLoading />;
  }

  if (serverStatus === "down") {
    return (
      <Layout>
        <ServerError />
      </Layout>
    );
  }

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          dismissible: true,
        }}
      />
      {(isRefreshing || isLoading) && <SpinnerLoading />}
      <AppBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/set-password"
            element={
              <SetPasswordPage />}
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route
            path="/confirm-google-auth"
            element={<OAuthHandler callback={oauthLoginWithGoogle} />}
          />
          <Route
            path="/confirm-github-auth"
            element={<OAuthHandler callback={oauthLoginWithGithub} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const OAuthHandler = ({callback}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    const sendCode = async () => {
      try {
        dispatch(callback(code))
        navigate("/dashboard"); 
      } catch (err) {
        navigate("/login");
      }
    };
    sendCode();
  }, [navigate, callback, dispatch]);

  return null; 
};

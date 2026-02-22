import { setServerOk } from "../../redux/auth/slice";
import serverError from "../../assets/server_error.png";
import { useDispatch } from "react-redux";
import { checkHealth } from "../../redux/auth/operations";
import { useEffect } from "react";
import css from "./ServerError.module.css";

export const ServerError = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkHealth({ silent: true }))
        .unwrap()
        .then((response) => {
          if (response.data.dbActive) {
            dispatch(setServerOk());
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 35000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.mainTextContainer}>
        <img src={serverError} alt="server error" />
        <h1>Sorry, something <br/> went wrong!</h1>
      </div>
      <p className={css.subText}>
        Please try again later.<br />
       We&apos;re working hard to fix the problem as soon as possible.
      </p>
    </div>
  );
};

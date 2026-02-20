import { setServerOk } from "../../redux/auth/slice";
import serverError from "../../assets/server_error.png";
import { useDispatch } from "react-redux";
import { checkHealth } from "../../redux/auth/operations";
import { useEffect } from "react";

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
    <>
      <img src={serverError} alt="server error" width="200" />
      <h1>Sorry, something went wrong!</h1>
      <p>
        Try later. We are working hard for to fix a problem for you soon as
        possible
      </p>
    </>
  );
};

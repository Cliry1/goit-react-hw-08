import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsPasswordSet } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import { openModal } from "../../redux/modal/slice";



export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const password = useSelector(selectIsPasswordSet);

  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {user.name}</p>
      {!password && <button type="button" onClick={()=>{dispatch(openModal({type:"SEND_EMAIL_RESET_PASSWORD", props:{setPasswordReason:true}}))}}>Set Password</button>
        }
      <button
        className={css.button}
        type="button"
        onClick={() => {
          dispatch(openModal({ type: "CONFIRM_LOGOUT" }));
        }}
      >
        Log Out
      </button>
    </div>
  );
};

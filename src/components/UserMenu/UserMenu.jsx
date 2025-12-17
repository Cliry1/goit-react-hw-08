import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';
import {openModal} from '../../redux/modal/slice'

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user  = useSelector(selectUser);

return(
  <div className={css.container}>
    <p className={css.text}>Welcome, {user.name}</p>
    <button className={css.button} type='button' onClick={()=>{dispatch(openModal({type:"CONFIRM_LOGOUT"}))}}>Log Out</button>
  </div>
)


}
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => {

  return (
    <div className={css.container}>
      <NavLink className={({ isActive }) => isActive ? `${css.register} ${css.active}` : css.register} to="/register">Register</NavLink>
      <NavLink className={({ isActive }) => isActive ? `${css.login} ${css.active}` : css.login} to="/login">Log In</NavLink>
    </div>
  );
};
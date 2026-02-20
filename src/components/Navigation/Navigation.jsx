import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export const Navigation = () => {
  const  isLoggedIn  = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.container}>
      <NavLink className={({ isActive }) => isActive ? `${css.home} ${css.active}` : css.home } to="/">PhoneBook</NavLink>
      {isLoggedIn && (<NavLink className={({ isActive }) => isActive ? `${css.contacts} ${css.active}` : css.contacts} to="/contacts">Contacts</NavLink>)}
    </nav>
  );
};
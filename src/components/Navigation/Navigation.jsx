import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export const Navigation = () => {
  const  isLoggedIn  = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.container}>
      <NavLink className={css.home} to="/">Home</NavLink>
      {isLoggedIn && (<NavLink className={css.contacts} to="/contacts">Contacts</NavLink>)}
    </nav>
  );
};
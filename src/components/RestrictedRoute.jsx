import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';


export const RestrictedRoute =({component:Component, redirectTo="/"})=>{
  const isLoggenIn = useSelector(selectIsLoggedIn);
  return isLoggenIn ? <Navigate to={redirectTo}/> :Component;
}
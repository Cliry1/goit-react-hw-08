import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { refreshUser } from '../redux/auth/operations';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(()=>import('../pages/HomePage'))
const RegistrationPage = lazy(()=>import('../pages/RegistrationPage'))
const LoginPage = lazy(()=>import('../pages/LoginPage'))
const ContactsPage = lazy(()=>import('../pages/ContactsPage'))

export default function App() {
 const dispatch = useDispatch();
 const isRefreshing = useSelector(selectIsRefreshing)
 useEffect(()=>{
  dispatch(refreshUser())
 },[dispatch])

  return isRefreshing?(
    <b>Refreshing user...</b>
  ) :
  (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage/>}/>}/>
        <Route path='/login' element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>}/>
        <Route path='/contacts' element={<PrivateRoute redirectTo="/login" component={<ContactsPage/>}/>}/>
      </Routes>
    </Layout>
  )
}
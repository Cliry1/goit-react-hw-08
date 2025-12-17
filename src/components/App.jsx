import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { oauthLoginWithGoogle, refreshToken, refreshUser,oauthLoginWithGithub } from '../redux/auth/operations';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { Route, Routes } from 'react-router-dom';
import { OAuthHandler } from './OAuthHandler'
import { selectToken } from '../redux/auth/selectors';
const ForgotPasswordPage = lazy(()=> import('../pages/ForgotPasswordPage'))
const HomePage = lazy(()=>import('../pages/HomePage'))
const RegistrationPage = lazy(()=>import('../pages/RegistrationPage'))
const LoginPage = lazy(()=>import('../pages/LoginPage'))
const ContactsPage = lazy(()=>import('../pages/ContactsPage'))

export default function App() {
 const dispatch = useDispatch();
 const isRefreshing = useSelector(selectIsRefreshing)
 const token = useSelector(selectToken)
 useEffect(()=>{
  if(token){
  dispatch(refreshUser())
  }
  const refreshEndpoints = ["/login","/"]; 
  const currentPath = window.location.pathname;


  if(token===null && currentPath.includes(refreshEndpoints)){
    dispatch(refreshToken())
  }
 },[dispatch, token])

  return isRefreshing?(
    <b>Refreshing user...</b>
  ) :
  (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage/>}/>}/>
        <Route path='/login' element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>}/>
        <Route path='/forgot-password' element={<RestrictedRoute redirectTo="/contacts" component={<ForgotPasswordPage/>}/>}/>
        <Route path='/contacts' element={<PrivateRoute redirectTo="/login" component={<ContactsPage/>}/>}/>
        <Route path="/confirm-google-auth" element={<OAuthHandler callback={oauthLoginWithGoogle}/>} />
        <Route path="/confirm-github-auth" element={<OAuthHandler callback={oauthLoginWithGithub}/>} />
      </Routes>
    </Layout>
  )
}
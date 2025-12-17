import css from "./OAuthButton.module.css";


const chooseTypeLogin = async (type)=>{
switch (type){
  case "google":
    window.location.href = "https://pet-proj-vjtd.onrender.com/auth/get-oauth-url-google"
    return;
  case "github":
    window.location.href = "https://pet-proj-vjtd.onrender.com/auth/get-oauth-url-github"
    return;
    default:
      return;
}

}



export const OAuthButton = ({ children, svg: Icon, type }) => {

  return (
  <button type="button" className={css.button} onClick={()=>chooseTypeLogin(type, )}>
    <span className={css.img}><Icon/></span>
    <span className={css.text}>{children}</span>
  </button>
  )
};

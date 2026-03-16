import DocumentTitle from "../../components/DocumentTitle";
import img from "../../assets/boy-showing-contact-book-illustration-svg-download-png-12773150.webp";
import imgFast from "../../assets/fast.png";
import imgSecure from "../../assets/secure.png";
import imgFree from "../../assets/free.png";
import imgEdit from "../../assets/edit.png";
import css from "./HomePage.module.css";
import {useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();


  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={`${css.container} animation`} >
        <div className={css.mainContent} >
          <div className={css.mainImgContainer}>
          <img className={css.mainImg} src={img} alt="Background illustration for page" />
          </div>
          <h1 className={css.title}>Your phonebook <br/>is waiting for you!</h1>
        </div>
        <button className={css.button} type="button" onClick={() => navigate("/contacts")}>Go to your contacts</button>
        <ul className={css.list}>
          <li className={css.listItem}>
              <img className={css.imgList} src={imgFast} alt="Fast search icon" />
              <p className={css.listItemText}>Fast search</p>
          </li>
          <li className={css.listItem}>
              <img className={css.imgList} src={imgEdit} alt="Editing contacts icon" />
              <p className={css.listItemText}>Editing contacts</p>
          </li>
          <li className={css.listItem}>
              <img className={css.imgList} src={imgFree} alt="Free use icon" />
              <p className={css.listItemText}>Free use</p>
          </li>
          <li className={css.listItem}  >
              <img className={css.imgList} src={imgSecure} alt="Secure icon" />
              <p className={css.listItemText}>Confidentially and securely</p>
          </li>
        </ul>
      </div>
    </>
  );
}

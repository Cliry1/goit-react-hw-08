import image from "../../assets/404.png";
import css from "./NotFoundPage.module.css";





export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <img className={css.img} src={image} alt="Not Found Page icon" />
        <p className={css.text}>
          Page not found. 
          The link you followed <br /> probably broken or the page has been removed.
        </p>
    </div>
  );
}

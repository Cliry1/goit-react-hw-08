import image from "../assets/404.png";



const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};



export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <img src={image} alt="" />
        <p>
          Page not found. <br />
          The link you followed probably broken or the page has been removed.
        </p>
    </div>
  );
}

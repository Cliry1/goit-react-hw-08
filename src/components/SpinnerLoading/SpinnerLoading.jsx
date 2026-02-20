import css from "./SpinnerLoading.module.css";

export const SpinnerLoading = ()=> {
  return (
    <div className={css.overlay}>
      <div className={css.spinner}></div>
    </div>
  );
}
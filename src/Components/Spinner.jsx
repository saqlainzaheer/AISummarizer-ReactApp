import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={`${styles.spinnerContainer} mt-20`}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;

import styles from "./Footer.module.scss";

export function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        Dmitri Antonenko — {new Date().getFullYear()}
      </div>
    </footer>
  );
}

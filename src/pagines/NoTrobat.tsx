import { Link } from "react-router";
import styles from "./NoTrobat.module.css";

const NoTrobat = () => {
  return (
    <section className={styles.pagina}>
      <h1>404 - Pàgina no trobada</h1>
      <p>Ho sentim, la pàgina que cerques no existeix.</p>
      <Link to="/">Torna a l'inici</Link>
    </section>
  );
};

export default NoTrobat;

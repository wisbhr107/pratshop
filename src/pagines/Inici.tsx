import { Link } from "react-router";
import styles from "./Inici.module.css";

const Inici = () => {
  return (
    <section className={styles.pagina}>
      <h1>Benvingut a PixelPrat</h1>
      <p>Jocs relaxants per a tots els estats d'ànim.</p>
      <Link to="/cataleg">Explora el catàleg</Link>
    </section>
  );
};

export default Inici;

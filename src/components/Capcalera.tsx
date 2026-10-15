import { NavLink, Link } from "react-router";
import clsx from "clsx";
import styles from "./Capcalera.module.css";

type Props = {
  unitatsCarro: number;
};

const Capcalera = ({ unitatsCarro }: Props) => {
  return (
    <header className={styles.capcalera}>
      <div className={styles.contenidor}>
        <NavLink to="/" className={styles.marca}>
          <span>PixelPrat</span>
        </NavLink>
        <nav className={styles.navegacio}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles.enllac, isActive && styles.enllacActiu)
            }
          >
            Inici
          </NavLink>
          <NavLink
            to="/cataleg"
            className={({ isActive }) =>
              clsx(styles.enllac, isActive && styles.enllacActiu)
            }
          >
            Catàleg
          </NavLink>
        </nav>
        <div className={styles.accions}>
          <Link to="/carro" className={styles.botoCarro} aria-label="Carret">
            <span>🛒</span>
            {unitatsCarro > 0 && (
              <span className={styles.insignia}>{unitatsCarro}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Capcalera;
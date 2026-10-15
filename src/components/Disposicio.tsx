import { Outlet } from "react-router";
import Capcalera from "./Capcalera";
import Peu from "./Peu";
import styles from "./Disposicio.module.css";

type Props = {
  unitatsCarro: number;
};

const Disposicio = ({ unitatsCarro }: Props) => {
  return (
    <div className={styles.contenidor}>
      <Capcalera unitatsCarro={unitatsCarro} />
      <main className={styles.principal}>
        <Outlet />
      </main>
      <Peu />
    </div>
  );
};

export default Disposicio;
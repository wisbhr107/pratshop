import { Link, Navigate, useLocation } from "react-router";
import type { ResumCompra } from "../tipus";
import styles from "./Confirmacio.module.css";

const formatPreu = new Intl.NumberFormat("ca-ES", {
  style: "currency",
  currency: "EUR",
});

export default function Confirmacio() {
  // El resumen llega por "state" desde la página de compra
  const location = useLocation();
  const resum = location.state as ResumCompra | null;

  // Si entras directamente a /confirmacio no hay resumen: vuelves al inicio
  if (!resum) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={styles.pagina}>
      <h1>Gràcies per la teva compra!</h1>
      <p>
        El teu número de comanda és <strong>{resum.numero}</strong>.
      </p>

      <ul className={styles.llista}>
        {resum.linies.map((l) => (
          <li key={l.nom}>
            <span>
              {l.nom} × {l.unitats}
            </span>
            <span>{formatPreu.format(l.subtotal)}</span>
          </li>
        ))}
      </ul>

      <p className={styles.total}>Total: {formatPreu.format(resum.total)}</p>

      <Link to="/cataleg">Tornar al catàleg</Link>
    </section>
  );
}
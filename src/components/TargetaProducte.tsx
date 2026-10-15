import { Link } from "react-router";
import clsx from "clsx";
import type { Producte } from "../tipus";
import { CATEGORIES } from "../dades/productes";
import styles from "./TargetaProducte.module.css";

type Props = {
  producte: Producte;
  onAfegir: (id: number) => void;
};

// Formateador de precios: 24.99 -> "24,99 €"
const formatPreu = new Intl.NumberFormat("ca-ES", {
  style: "currency",
  currency: "EUR",
});

export default function TargetaProducte({ producte, onAfegir }: Props) {
  const esgotat = producte.estoc === 0;
  const categoria = CATEGORIES.find((c) => c.id === producte.categoriaId);

  return (
    <article className={clsx(styles.targeta, esgotat && styles.esgotada)}>
      <div className={styles.portada}>
        <img src={producte.imatge} alt={producte.nom} loading="lazy" />
        {esgotat && <span className={styles.etiqueta}>Esgotat</span>}
      </div>

      <div className={styles.cos}>
        <span className={styles.categoria}>{categoria?.nom}</span>
        <h3 className={styles.titol}>
          <Link to={`/producte/${producte.id}`}>{producte.nom}</Link>
        </h3>
        <p className={styles.descripcio}>{producte.descripcio}</p>
        <p className={styles.preu}>{formatPreu.format(producte.preu)}</p>

        <button
          type="button"
          className={styles.boto}
          disabled={esgotat}
          onClick={() => onAfegir(producte.id)}
        >
          {esgotat ? "Esgotat" : "Afegir al carro"}
        </button>
      </div>
    </article>
  );
}
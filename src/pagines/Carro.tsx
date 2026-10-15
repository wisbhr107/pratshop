import { Link } from "react-router";
import type { LiniaCarro } from "../tipus";
import { PRODUCTES } from "../dades/productes";
import SelectorQuantitat from "../components/SelectorQuantitat";
import styles from "./Carro.module.css";

type Props = {
  carro: LiniaCarro[];
  onCanviar: (id: number, unitats: number) => void;
  onEliminar: (id: number) => void;
  onBuidar: () => void;
};

const formatPreu = new Intl.NumberFormat("ca-ES", {
  style: "currency",
  currency: "EUR",
});

export default function Carro({ carro, onCanviar, onEliminar, onBuidar }: Props) {
  // Unimos cada línea del carro con los datos de su producto.
  // Si algún producto no existiera, esa línea se ignora.
  const linies = carro.flatMap((linia) => {
    const producte = PRODUCTES.find((p) => p.id === linia.producteId);
    return producte ? [{ producte, unitats: linia.unitats }] : [];
  });

  // El total se calcula cada vez, no se guarda en ningún sitio
  const total = linies.reduce(
    (suma, l) => suma + l.producte.preu * l.unitats,
    0,
  );

  if (linies.length === 0) {
    return (
      <section className={styles.buit}>
        <h1>El teu carro</h1>
        <p>El carro està buit.</p>
        <Link to="/cataleg">Anar al catàleg</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>El teu carro</h1>

      <ul className={styles.llista}>
        {linies.map(({ producte, unitats }) => (
          <li key={producte.id} className={styles.linia}>
            <img
              className={styles.imatge}
              src={producte.imatge}
              alt={producte.nom}
            />

            <div className={styles.info}>
              <Link to={`/producte/${producte.id}`} className={styles.nom}>
                {producte.nom}
              </Link>
              <span className={styles.preuUnitat}>
                {formatPreu.format(producte.preu)} / unitat
              </span>
            </div>

            <SelectorQuantitat
              valor={unitats}
              maxim={producte.estoc}
              onCanvi={(nou) => onCanviar(producte.id, nou)}
            />

            <span className={styles.subtotal}>
              {formatPreu.format(producte.preu * unitats)}
            </span>

            <button
              type="button"
              className={styles.eliminar}
              onClick={() => onEliminar(producte.id)}
              aria-label={`Eliminar ${producte.nom} del carro`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.resum}>
        <p className={styles.total}>Total: {formatPreu.format(total)}</p>

        <div className={styles.accions}>
          <button type="button" className={styles.secundari} onClick={onBuidar}>
            Buidar el carro
          </button>
          <Link to="/cataleg" className={styles.secundari}>
            Continuar comprant
          </Link>
          <Link to="/compra" className={styles.principal}>
            Finalitzar la compra
          </Link>
        </div>
      </div>
    </section>
  );
}
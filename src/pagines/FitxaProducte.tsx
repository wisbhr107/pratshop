import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import { CATEGORIES, PRODUCTES } from "../dades/productes";
import SelectorQuantitat from "../components/SelectorQuantitat";
import styles from "./FitxaProducte.module.css";

type Props = {
  onAfegir: (id: number, unitats: number) => void;
};

const formatPreu = new Intl.NumberFormat("ca-ES", {
  style: "currency",
  currency: "EUR",
});

export default function FitxaProducte({ onAfegir }: Props) {
  // Los hooks siempre van al principio, antes de cualquier return
  const { id } = useParams();
  const navigate = useNavigate();

  // Guardamos la cantidad junto con el id del producto al que pertenece
  const [seleccio, setSeleccio] = useState({ id, quantitat: 1 });

  // Si el producto de la URL ya no es el guardado, la cantidad vuelve a 1.
  // Es un valor derivado: se calcula, no se guarda.
  const quantitat = seleccio.id === id ? seleccio.quantitat : 1;

  // useParams devuelve texto, así que lo convertimos a número
  const producte = PRODUCTES.find((p) => p.id === Number(id));

  // Si el id no existe, vamos a una URL inexistente y cae en la 404 ("*")
  if (!producte) {
    return <Navigate to="/404" replace />;
  }

  const categoria = CATEGORIES.find((c) => c.id === producte.categoriaId);
  const esgotat = producte.estoc === 0;

  function canviaQuantitat(nova: number) {
    setSeleccio({ id, quantitat: nova });
  }

  function afegir() {
    if (!producte) return;
    onAfegir(producte.id, quantitat);
    setSeleccio({ id, quantitat: 1 });
  }

  return (
    <section>
      <button type="button" className={styles.tornar} onClick={() => navigate(-1)}>
        ← Tornar
      </button>

      <div className={styles.fitxa}>
        <img className={styles.imatge} src={producte.imatge} alt={producte.nom} />

        <div className={styles.info}>
          <span className={styles.categoria}>{categoria?.nom}</span>
          <h1 className={styles.titol}>{producte.nom}</h1>
          <p>{producte.descripcio}</p>
          <p className={styles.preu}>{formatPreu.format(producte.preu)}</p>

          {esgotat ? (
            <>
              <p className={styles.esgotat}>Esgotat</p>
              <button type="button" className={styles.afegir} disabled>
                Esgotat
              </button>
            </>
          ) : (
            <>
              <p className={styles.estoc}>Estoc: {producte.estoc} unitats</p>
              <SelectorQuantitat
                valor={quantitat}
                maxim={producte.estoc}
                onCanvi={canviaQuantitat}
              />
              <button type="button" className={styles.afegir} onClick={afegir}>
                Afegir al carro
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
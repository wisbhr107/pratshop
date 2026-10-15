import { useSearchParams } from "react-router";
import clsx from "clsx";
import { CATEGORIES, PRODUCTES } from "../dades/productes";
import TargetaProducte from "../components/TargetaProducte";
import styles from "./Cataleg.module.css";

type Props = {
  onAfegir: (id: number) => void;
};

export default function Cataleg({ onAfegir }: Props) {
  // La cerca y la categoría viven en la URL: ?q=...&categoria=...
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const categoria = params.get("categoria") ?? "";

  // Pone o quita un parámetro de la URL
  function canviarParam(clau: string, valor: string) {
    const nous = new URLSearchParams(params);
    if (valor) {
      nous.set(clau, valor);
    } else {
      nous.delete(clau);
    }
    setParams(nous, { replace: true });
  }

  // Lista filtrada: se calcula cada vez, no se guarda en ningún estado
  const visibles = PRODUCTES.filter(
    (p) =>
      p.nom.toLowerCase().includes(q.toLowerCase()) &&
      (categoria === "" || p.categoriaId === categoria),
  );

  return (
    <section>
      <h1>Catàleg</h1>

      <input
        type="search"
        className={styles.cerca}
        placeholder="Cerca jocs pel nom..."
        aria-label="Cerca jocs pel nom"
        value={q}
        onChange={(e) => canviarParam("q", e.target.value)}
      />

      <div className={styles.filtres}>
        <button
          type="button"
          aria-pressed={categoria === ""}
          className={clsx(styles.xip, categoria === "" && styles.xipActiu)}
          onClick={() => canviarParam("categoria", "")}
        >
          Totes
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={categoria === c.id}
            className={clsx(styles.xip, categoria === c.id && styles.xipActiu)}
            onClick={() => canviarParam("categoria", c.id)}
          >
            {c.nom}
          </button>
        ))}
      </div>

      <p className={styles.comptador}>
        Mostrant {visibles.length} de {PRODUCTES.length} productes
      </p>

      {visibles.length === 0 ? (
        <p className={styles.buit}>
          No hem trobat cap joc amb aquests filtres. Prova una altra cerca.
        </p>
      ) : (
        <div className={styles.quadricula}>
          {visibles.map((p) => (
            <TargetaProducte key={p.id} producte={p} onAfegir={onAfegir} />
          ))}
        </div>
      )}
    </section>
  );
}
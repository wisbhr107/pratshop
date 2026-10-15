import styles from "./SelectorQuantitat.module.css";

type Props = {
  valor: number;
  minim?: number;
  maxim: number;
  onCanvi: (nou: number) => void;
};

// Componente controlado: no guarda estado propio.
// El valor lo manda el padre y el componente solo avisa de los cambios.
export default function SelectorQuantitat({
  valor,
  minim = 1,
  maxim,
  onCanvi,
}: Props) {
  return (
    <div className={styles.selector}>
      <button
        type="button"
        className={styles.boto}
        aria-label="Disminuir unitats"
        disabled={valor <= minim}
        onClick={() => onCanvi(valor - 1)}
      >
        −
      </button>

      <span className={styles.valor} aria-live="polite">
        {valor}
      </span>

      <button
        type="button"
        className={styles.boto}
        aria-label="Augmentar unitats"
        disabled={valor >= maxim}
        onClick={() => onCanvi(valor + 1)}
      >
        +
      </button>
    </div>
  );
}
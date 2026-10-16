import { Link } from "react-router";
import { PRODUCTES } from "../dades/productes";
import TargetaProducte from "../components/TargetaProducte";
import styles from "./Inici.module.css";

type Props = {
  onAfegir: (id: number) => void;
};

export default function Inici({ onAfegir }: Props) {
  // Destacados: los 4 primeros productos con stock
  const destacats = PRODUCTES.filter((p) => p.estoc > 0).slice(0, 4);

  return (
    <section className={styles.pagina}>
      <h1>Benvingut a PixelPrat</h1>
      <p>Jocs relaxants per a tots els estats d'ànim.</p>

      <h2>Jocs destacats</h2>
      <div className={styles.quadricula}>
        {destacats.map((p) => (
          <TargetaProducte key={p.id} producte={p} onAfegir={onAfegir} />
        ))}
      </div>

      <Link to="/cataleg">Explora el catàleg</Link>
    </section>
  );
}
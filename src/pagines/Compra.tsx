import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import type { LiniaCarro, ResumCompra } from "../tipus";
import { PRODUCTES } from "../dades/productes";
import Boto from "../components/Boto";
import styles from "./Compra.module.css";

type Props = {
  carro: LiniaCarro[];
  onBuidar: () => void;
};

type DadesFormulari = {
  nom: string;
  correu: string;
  adreca: string;
  codiPostal: string;
  pagament: string;
  accepta: boolean;
};

// Un posible mensaje de error por cada campo
type Errors = Partial<Record<keyof DadesFormulari, string>>;

const METODES = ["targeta", "paypal", "transferencia"];

const formatPreu = new Intl.NumberFormat("ca-ES", {
  style: "currency",
  currency: "EUR",
});

// Recibe los datos y devuelve los errores. Si no hay errores, devuelve {}.
function validar(dades: DadesFormulari): Errors {
  const errors: Errors = {};

  if (dades.nom.trim().length < 2) {
    errors.nom = "Escriu el teu nom (mínim 2 lletres).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dades.correu)) {
    errors.correu = "Escriu un correu vàlid, per exemple nom@exemple.com.";
  }
  if (dades.adreca.trim().length < 5) {
    errors.adreca = "Escriu l'adreça completa.";
  }
  if (!/^\d{5}$/.test(dades.codiPostal)) {
    errors.codiPostal = "El codi postal ha de tenir exactament 5 xifres.";
  }
  if (!METODES.includes(dades.pagament)) {
    errors.pagament = "Tria un mètode de pagament.";
  }
  if (!dades.accepta) {
    errors.accepta = "Has d'acceptar les condicions.";
  }

  return errors;
}

export default function Compra({ carro, onBuidar }: Props) {
  // Todos los hooks van antes de cualquier return condicional
  const navigate = useNavigate();
  const [dades, setDades] = useState<DadesFormulari>({
    nom: "",
    correu: "",
    adreca: "",
    codiPostal: "",
    pagament: "",
    accepta: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [finalitzada, setFinalitzada] = useState(false);

  // Cambia un campo de texto
  const actualitza = (camp: Exclude<keyof DadesFormulari, "accepta">, valor: string) => {
    setDades((actual) => ({ ...actual, [camp]: valor }));
  };

  // Unimos cada línea con su producto
  const linies = carro.flatMap((linia) => {
    const producte = PRODUCTES.find((p) => p.id === linia.producteId);
    return producte ? [{ producte, unitats: linia.unitats }] : [];
  });
  const total = linies.reduce((suma, l) => suma + l.producte.preu * l.unitats, 0);

  // Sin productos no se puede comprar. "finalitzada" evita redirigir justo
  // después de comprar, cuando el carro se acaba de vaciar.
  if (linies.length === 0 && !finalitzada) {
    return <Navigate to="/cataleg" replace />;
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errorsNous = validar(dades);
    setErrors(errorsNous);
    if (Object.keys(errorsNous).length > 0) return;

    const resum: ResumCompra = {
      numero: "PP-" + Math.floor(100000 + Math.random() * 900000),
      linies: linies.map((l) => ({
        nom: l.producte.nom,
        unitats: l.unitats,
        subtotal: l.producte.preu * l.unitats,
      })),
      total,
    };

    setFinalitzada(true);
    onBuidar();
    navigate("/confirmacio", { state: resum });
  }

  return (
    <section>
      <h1>Finalitzar la compra</h1>

      <div className={styles.disposicio}>
        {/* noValidate: desactiva la validación del navegador, validamos nosotros */}
        <form className={styles.formulari} onSubmit={enviar} noValidate>
          <div className={styles.camp}>
            <label htmlFor="nom">Nom complet</label>
            <input
              id="nom"
              type="text"
              autoComplete="name"
              value={dades.nom}
              onChange={(e) => actualitza("nom", e.target.value)}
              aria-invalid={errors.nom ? true : undefined}
              aria-describedby={errors.nom ? "error-nom" : undefined}
            />
            {errors.nom && (
              <p id="error-nom" className={styles.error} role="alert">
                {errors.nom}
              </p>
            )}
          </div>

          <div className={styles.camp}>
            <label htmlFor="correu">Correu electrònic</label>
            <input
              id="correu"
              type="email"
              autoComplete="email"
              value={dades.correu}
              onChange={(e) => actualitza("correu", e.target.value)}
              aria-invalid={errors.correu ? true : undefined}
              aria-describedby={errors.correu ? "error-correu" : undefined}
            />
            {errors.correu && (
              <p id="error-correu" className={styles.error} role="alert">
                {errors.correu}
              </p>
            )}
          </div>

          <div className={styles.camp}>
            <label htmlFor="adreca">Adreça</label>
            <input
              id="adreca"
              type="text"
              autoComplete="street-address"
              value={dades.adreca}
              onChange={(e) => actualitza("adreca", e.target.value)}
              aria-invalid={errors.adreca ? true : undefined}
              aria-describedby={errors.adreca ? "error-adreca" : undefined}
            />
            {errors.adreca && (
              <p id="error-adreca" className={styles.error} role="alert">
                {errors.adreca}
              </p>
            )}
          </div>

          <div className={styles.camp}>
            <label htmlFor="codiPostal">Codi postal</label>
            <input
              id="codiPostal"
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              value={dades.codiPostal}
              onChange={(e) => actualitza("codiPostal", e.target.value)}
              aria-invalid={errors.codiPostal ? true : undefined}
              aria-describedby={errors.codiPostal ? "error-codiPostal" : undefined}
            />
            {errors.codiPostal && (
              <p id="error-codiPostal" className={styles.error} role="alert">
                {errors.codiPostal}
              </p>
            )}
          </div>

          <div className={styles.camp}>
            <label htmlFor="pagament">Mètode de pagament</label>
            <select
              id="pagament"
              value={dades.pagament}
              onChange={(e) => actualitza("pagament", e.target.value)}
              aria-invalid={errors.pagament ? true : undefined}
              aria-describedby={errors.pagament ? "error-pagament" : undefined}
            >
              <option value="">Tria una opció</option>
              <option value="targeta">Targeta</option>
              <option value="paypal">PayPal</option>
              <option value="transferencia">Transferència</option>
            </select>
            {errors.pagament && (
              <p id="error-pagament" className={styles.error} role="alert">
                {errors.pagament}
              </p>
            )}
          </div>

          <div className={styles.camp}>
            <label className={styles.condicions} htmlFor="accepta">
              <input
                id="accepta"
                type="checkbox"
                checked={dades.accepta}
                onChange={(e) =>
                  setDades((actual) => ({ ...actual, accepta: e.target.checked }))
                }
                aria-invalid={errors.accepta ? true : undefined}
                aria-describedby={errors.accepta ? "error-accepta" : undefined}
              />
              Accepto les condicions
            </label>
            {errors.accepta && (
              <p id="error-accepta" className={styles.error} role="alert">
                {errors.accepta}
              </p>
            )}
          </div>

          <Boto type="submit">Confirmar la compra</Boto>
        </form>

        <aside className={styles.resum}>
          <h2>Resum</h2>
          <ul className={styles.llista}>
            {linies.map(({ producte, unitats }) => (
              <li key={producte.id}>
                <span>
                  {producte.nom} × {unitats}
                </span>
                <span>{formatPreu.format(producte.preu * unitats)}</span>
              </li>
            ))}
          </ul>
          <p className={styles.total}>Total: {formatPreu.format(total)}</p>
        </aside>
      </div>
    </section>
  );
}

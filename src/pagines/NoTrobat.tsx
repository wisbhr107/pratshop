import { Link } from "react-router";

const NoTrobat = () => {
  return (
    <section>
      <h1>404 - Pàgina no trobada</h1>
      <p>Ho sentim, la pàgina que cerques no existeix.</p>
      <Link to="/">Torna a l'inici</Link>
    </section>
  );
};

export default NoTrobat;

import { useState } from "react";
import { Routes, Route } from "react-router";
import type { LiniaCarro } from "./tipus";
import { PRODUCTES } from "./dades/productes";
import Disposicio from "./components/Disposicio";
import Inici from "./pagines/Inici";
import Cataleg from "./pagines/Cataleg";
import NoTrobat from "./pagines/NoTrobat";

const App = () => {
  // El carro vive aquí porque varias páginas lo necesitarán
  const [carro, setCarro] = useState<LiniaCarro[]>([]);

  // El total NO se guarda: se calcula a partir del carro
  const totalUnitats = carro.reduce((total, linia) => total + linia.unitats, 0);

  // Añade una unidad, sin pasar nunca del stock
  const afegirAlCarro = (id: number) => {
    const producte = PRODUCTES.find((p) => p.id === id);
    if (!producte) return;

    setCarro((actual) => {
      const linia = actual.find((l) => l.producteId === id);

      if (!linia) {
        return producte.estoc > 0
          ? [...actual, { producteId: id, unitats: 1 }]
          : actual;
      }
      if (linia.unitats >= producte.estoc) return actual;

      return actual.map((l) =>
        l.producteId === id ? { ...l, unitats: l.unitats + 1 } : l,
      );
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Disposicio unitatsCarro={totalUnitats} />}>
        <Route index element={<Inici />} />
        <Route path="cataleg" element={<Cataleg onAfegir={afegirAlCarro} />} />
        <Route path="*" element={<NoTrobat />} />
      </Route>
    </Routes>
  );
};

export default App;
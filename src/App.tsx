import { useState } from "react";
import { Routes, Route } from "react-router";
import type { LiniaCarro } from "./tipus";
import { PRODUCTES } from "./dades/productes";
import Disposicio from "./components/Disposicio";
import Inici from "./pagines/Inici";
import Cataleg from "./pagines/Cataleg";
import NoTrobat from "./pagines/NoTrobat";
import FitxaProducte from "./pagines/FitxaProducte";

const App = () => {
  // El carro vive aquí porque varias páginas lo necesitarán
  const [carro, setCarro] = useState<LiniaCarro[]>([]);

  // El total NO se guarda: se calcula a partir del carro
  const totalUnitats = carro.reduce((total, linia) => total + linia.unitats, 0);

  // Añade `unitats` unidades (por defecto 1), sin pasar nunca del stock
  const afegirAlCarro = (id: number, unitats: number = 1) => {
    const producte = PRODUCTES.find((p) => p.id === id);
    if (!producte) return;

    setCarro((actual) => {
      const linia = actual.find((l) => l.producteId === id);
      const jaAlCarro = linia ? linia.unitats : 0;

      // Sumamos lo que ya había y lo nuevo, pero sin superar el stock
      const total = Math.min(jaAlCarro + unitats, producte.estoc);
      if (total <= 0) return actual;

      if (!linia) {
        return [...actual, { producteId: id, unitats: total }];
      }
      return actual.map((l) =>
        l.producteId === id ? { ...l, unitats: total } : l,
      );
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Disposicio unitatsCarro={totalUnitats} />}>
        <Route index element={<Inici />} />
        <Route path="cataleg" element={<Cataleg onAfegir={afegirAlCarro} />} />
        <Route
          path="producte/:id"
          element={<FitxaProducte onAfegir={afegirAlCarro} />}
        />
        <Route path="*" element={<NoTrobat />} />
      </Route>
    </Routes>
  );
};

export default App;
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import type { LiniaCarro } from "./tipus";
import { PRODUCTES } from "./dades/productes";
import Disposicio from "./components/Disposicio";
import Inici from "./pagines/Inici";
import Cataleg from "./pagines/Cataleg";
import FitxaProducte from "./pagines/FitxaProducte";
import Carro from "./pagines/Carro";
import Compra from "./pagines/Compra";
import Confirmacio from "./pagines/Confirmacio";
import NoTrobat from "./pagines/NoTrobat";

const CLAU_CARRO = "pratshop-carro";

// Lee el carro guardado. Si algo falla (no hay datos, JSON roto, datos raros),
// devuelve un carro vacío en lugar de romper la aplicación.
function llegirCarro(): LiniaCarro[] {
  try {
    const text = localStorage.getItem(CLAU_CARRO);
    if (!text) return [];

    const dades: unknown = JSON.parse(text);
    if (!Array.isArray(dades)) return [];

    return dades.filter(
      (l: unknown): l is LiniaCarro =>
        typeof l === "object" &&
        l !== null &&
        "producteId" in l &&
        typeof l.producteId === "number" &&
        "unitats" in l &&
        typeof l.unitats === "number" &&
        PRODUCTES.some(
          (p) => p.id === l.producteId && l.unitats >= 1 && l.unitats <= p.estoc,
        ),
    );
  } catch {
    return [];
  }
}

const App = () => {
  // El carro vive aquí porque varias páginas lo necesitan.
  // Pasamos una función a useState para que solo lea localStorage la primera vez.
  const [carro, setCarro] = useState<LiniaCarro[]>(llegirCarro);

  // Cada vez que el carro cambia, lo guardamos
  useEffect(() => {
    try {
      localStorage.setItem(CLAU_CARRO, JSON.stringify(carro));
    } catch {
      // Si no se puede guardar (modo privado, disco lleno), la app sigue funcionando
    }
  }, [carro]);

  // El total NO se guarda: se calcula a partir del carro
  const totalUnitats = carro.reduce((total, linia) => total + linia.unitats, 0);

  // Añade `unitats` unidades (por defecto 1), sin pasar nunca del stock
  const afegirAlCarro = (id: number, unitats: number = 1) => {
    const producte = PRODUCTES.find((p) => p.id === id);
    if (!producte) return;

    setCarro((actual) => {
      const linia = actual.find((l) => l.producteId === id);
      const jaAlCarro = linia ? linia.unitats : 0;

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

  // Pone una cantidad concreta (entre 1 y el stock)
  const canviarUnitats = (id: number, unitats: number) => {
    const producte = PRODUCTES.find((p) => p.id === id);
    if (!producte) return;
    const valid = Math.max(1, Math.min(unitats, producte.estoc));

    setCarro((actual) =>
      actual.map((l) => (l.producteId === id ? { ...l, unitats: valid } : l)),
    );
  };

  const eliminarLinia = (id: number) => {
    setCarro((actual) => actual.filter((l) => l.producteId !== id));
  };

  const buidarCarro = () => {
    setCarro([]);
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
        <Route
          path="carro"
          element={
            <Carro
              carro={carro}
              onCanviar={canviarUnitats}
              onEliminar={eliminarLinia}
              onBuidar={buidarCarro}
            />
          }
        />
        <Route
          path="compra"
          element={<Compra carro={carro} onBuidar={buidarCarro} />}
        />
        <Route path="confirmacio" element={<Confirmacio />} />
        <Route path="*" element={<NoTrobat />} />
      </Route>
    </Routes>
  );
};

export default App;
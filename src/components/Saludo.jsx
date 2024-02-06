export function Saludo() {
  const date = new Date();
  const hour = date.getHours();
  let saludo = "";

  if (hour >= 6 && hour < 12) {
    saludo = "Buenos días";
  } else if (hour >= 12 && hour < 20) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }

  return <h1>{saludo}</h1>;
}

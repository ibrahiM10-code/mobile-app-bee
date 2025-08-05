export function formatFecha(fecha) {
  if (!fecha) return "";
  const [day, month, year] = fecha.split("-");
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const mesNombre = meses[parseInt(month, 10) - 1];
  return `${day} de ${mesNombre}, ${year}`;
}
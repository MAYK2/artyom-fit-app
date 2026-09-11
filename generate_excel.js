const fs = require('fs');
const xlsx = require('xlsx');

const rawData = fs.readFileSync('data/suplementos.json');
const data = JSON.parse(rawData);

const rows = data.map(item => {
  const saboresList = item.sabores || [];
  const saboresStr = saboresList.length > 0 ? saboresList.map(s => s.nombre).join(', ') : 'Único';
  return {
    'Marca': item.marca || '',
    'Producto': item.nombre || '',
    'Sabores Disponibles': saboresStr,
    'Precio Final': item.precio || 0
  };
});

const ws = xlsx.utils.json_to_sheet(rows);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Lista de Precios");
xlsx.writeFile(wb, "lista_precios_clientes.xlsx");
console.log("Excel generado exitosamente.");

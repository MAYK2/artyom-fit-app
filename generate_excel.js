const fs = require('fs');
const xlsx = require('xlsx');

const rawData = fs.readFileSync('data/suplementos.json');
const data = JSON.parse(rawData);

const flavorKeywords = [
  "Chocolate", "Vainilla", "Frutilla", "Frutos Rojos", 
  "Fruit Punch", "Neutra", "Neutro", "Naranja", "Limón", "Limon",
  "Coco", "Cookies & Cream", "Uva", "Manzana", "Mandarina"
];

const rows = data.map(item => {
  let saboresStr = 'Único';
  
  // 1. If explicit flavors exist in JSON array
  if (item.sabores && item.sabores.length > 0) {
    saboresStr = item.sabores.map(s => s.nombre).join(', ');
  } else {
    // 2. Try to guess from the name or image URL
    const searchString = `${item.nombre || ''} ${item.imagen || ''}`.toLowerCase();
    
    // Check if any flavor keyword is in the search string
    const foundFlavors = flavorKeywords.filter(flavor => 
      searchString.includes(flavor.toLowerCase())
    );
    
    if (foundFlavors.length > 0) {
      saboresStr = foundFlavors.join(', ');
    }
  }

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
console.log("Excel generado con inteligencia de sabores.");

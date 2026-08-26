const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

let updatedHombres = 0;
let updatedMujeres = 0;

data.forEach(item => {
  const nombreLower = item.nombre.toLowerCase();
  
  // 1. Musculosas de hombre y Shorts de hombre: +15%
  if (item.genero === 'Hombre' && (nombreLower.includes('musculosa') || nombreLower.includes('short'))) {
    const original = item.precio;
    item.precio = Math.round(original * 1.15);
    console.log(`Hombre (+15%): ${item.nombre} | ${original} -> ${item.precio}`);
    updatedHombres++;
  }
  
  // 2. Mujer que salga menos de 15.000: +10%
  // Nota: si la usuaria también tiene ropa Interior, ¿aplica a todo? Dice "todo lo que salga menos de 15000 pesos de mujer".
  else if (item.genero === 'Mujer' && item.precio > 0 && item.precio < 15000) {
    const original = item.precio;
    item.precio = Math.round(original * 1.10);
    console.log(`Mujer (+10%): ${item.nombre} | ${original} -> ${item.precio}`);
    updatedMujeres++;
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nUpdated ${updatedHombres} men's items and ${updatedMujeres} women's items.`);

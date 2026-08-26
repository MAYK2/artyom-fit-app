const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

let updatedCount = 0;

data.forEach(item => {
  const nombre = item.nombre.toLowerCase();
  let oldPrecio = item.precio;

  if (nombre.includes('triangulito')) {
    item.precio = 9000;
  } else if (nombre.includes('caja') && (nombre.includes('conjunto') || nombre.includes('conj') || nombre.includes('cj'))) {
    // "Conjuntos con aro y caja" -> 15000
    item.precio = 15000;
  } else if (nombre.includes('boxer')) {
    item.precio = 5000;
  } else if (nombre.includes('colaless')) {
    item.precio = 3500;
  } else if (nombre.includes('bombacha') && nombre.includes('nena')) {
    item.precio = 3000;
  } else if (nombre.includes('señora') || nombre.includes('senora') || nombre.includes('bombacha')) {
    if (!nombre.includes('nena')) {
      item.precio = 5000;
    }
  } else if (nombre.includes('pijama')) {
    item.precio = 15000;
  }

  if (oldPrecio !== item.precio) {
    console.log(`Actualizado ${item.nombre}: $${item.precio}`);
    updatedCount++;
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Precios actualizados para ${updatedCount} productos.`);

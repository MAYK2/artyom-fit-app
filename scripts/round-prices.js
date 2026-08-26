const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

let updated = 0;

data.forEach(item => {
  if (item.precio > 0 && item.precio % 1000 !== 0) {
    const original = item.precio;
    // Redondeo hacia arriba para no perder margen de ganancia respecto al aumento
    item.precio = Math.ceil(original / 1000) * 1000;
    
    // Si el redondeo hacia arriba es muy exagerado (ej. 3300 a 4000 es mucho salto)
    // una alternativa es Math.round, pero Math.round(3300) = 3000 (anula el aumento).
    // Usaremos Math.round normal, excepto si anula el aumento, en cuyo caso forzamos el techo.
    const rounded = Math.round(original / 1000) * 1000;
    if (rounded >= original) {
      item.precio = rounded;
    } else {
      item.precio = Math.ceil(original / 1000) * 1000;
    }

    console.log(`Rounded: ${item.nombre} | ${original} -> ${item.precio}`);
    updated++;
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nRounded ${updated} prices to the nearest 1000.`);

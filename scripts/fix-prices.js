const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

data.forEach(item => {
  const nombre = item.nombre.toLowerCase();
  
  if (nombre.includes('distrit')) {
    item.precio = 19000;
  }
  if (nombre.includes('trianguliti')) {
    item.precio = 9000;
  }
  if (nombre.includes('pantalon') && nombre.includes('buzo')) {
    item.precio = 19000; // Pantalon de buzo
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed specific prices.');

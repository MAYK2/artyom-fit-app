const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

data.forEach(item => {
  if (!item.genero) {
    item.genero = "Unisex";
  }
  if (!item.categoria || item.categoria === "Ropa" || item.categoria === "Remeras" || item.categoria === "Shorts") {
    // Standardize default categories
    item.categoria = "Deportiva";
    // For testing the UI, let's randomly assign some to "Interior" and "Mujer" if they are placeholders
    if (item.nombre.includes('Producto a definir')) {
      // Randomly distribute to show off the filters
      const isInterior = Math.random() > 0.8;
      const isMujer = Math.random() > 0.5;
      item.categoria = isInterior ? "Interior" : "Deportiva";
      item.genero = isMujer ? "Mujer" : "Hombre";
    }
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('Ropa categories updated successfully.');

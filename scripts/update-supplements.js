const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/suplementos.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

// Update existing items to include the brand name in the product name
data.forEach(item => {
  if (!item.nombre.startsWith(item.marca)) {
    item.nombre = `${item.marca} ${item.nombre}`;
  }
});

// Update Platinum Whey price to 90000
const platinumWhey = data.find(item => item.id === 'whey-platinum-star-2lb');
if (platinumWhey) {
  platinumWhey.precio = 90000;
}

// Check if regular whey exists, if not, add it with price 75000
let regularWhey = data.find(item => item.id === 'whey-protein-star-2lb');
if (!regularWhey) {
  data.push({
    id: "whey-protein-star-2lb",
    marca: "Star Nutrition",
    nombre: "Star Nutrition Whey Protein 2lb Doy Pack",
    precio: 75000,
    imagen: "/productos/star-whey-chocolate-2lb.jpg", // using same image for now or we can omit it if there isn't one
    categoria: "Proteína",
    stock: true,
    descripcion: "La Whey Protein clásica de Star Nutrition es ideal para la recuperación muscular. Aporta proteínas de alta calidad con un perfil completo de aminoácidos. Formato Doy Pack de 2 lb."
  });
} else {
  regularWhey.precio = 75000;
}

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('Suplementos updated successfully.');

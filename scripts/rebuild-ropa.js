const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../ropa_temp2');
const DEST_DIR = path.join(__dirname, '../public/productos/ropa');
const JSON_FILE = path.join(__dirname, '../data/ropa.json');

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// 1. Delete old images
const oldFiles = fs.readdirSync(DEST_DIR);
for (const file of oldFiles) {
  fs.unlinkSync(path.join(DEST_DIR, file));
}
console.log(`Deleted ${oldFiles.length} old images.`);

// 2. Process new files
const files = fs.readdirSync(TEMP_DIR);
let ropaData = [];

function generateProductInfo(filename) {
  const base = path.basename(filename, path.extname(filename));
  // Clean up camel case and spaces
  const spaced = base.replace(/([A-Z])/g, ' $1').trim().replace(/_/g, ' ').replace(/-/g, ' ');
  
  // Format nicely
  const titleWords = spaced.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  let nombreReal = titleWords.join(' ').replace('  ', ' ');
  
  // Heuristics
  const lowerBase = base.toLowerCase();
  
  let categoria = "Deportiva";
  let genero = "Unisex";
  
  // Infer gender
  if (lowerBase.includes('dama') || lowerBase.includes('mujer') || lowerBase.includes('biker') || lowerBase.includes('calza') || lowerBase.includes('pescadora') || lowerBase.includes('triangulito') || lowerBase.includes('bombacha') || lowerBase.includes('conjarmado') || lowerBase.includes('conjuntoarmado') || lowerBase.includes('cjarmado') || lowerBase.includes('senora') || lowerBase.includes('señora')) {
    genero = "Mujer";
  } else if (lowerBase.includes('hombre') || lowerBase.includes('boxer') || lowerBase.includes('cojones')) {
    genero = "Hombre";
  }

  // Infer category
  if (lowerBase.includes('boxer') || lowerBase.includes('pijama') || lowerBase.includes('bombacha') || lowerBase.includes('triangulito') || lowerBase.includes('conjarmado') || lowerBase.includes('cjarmado') || lowerBase.includes('conjuntoarmado')) {
    categoria = "Interior";
  } else if (lowerBase.includes('jean')) {
    categoria = "Ropa Casual"; // or Deportiva? user said Deportiva / Interior. Let's make it Deportiva for the filter.
    categoria = "Deportiva";
  }

  // Enhance name
  nombreReal = nombreReal.replace('Dama', 'Mujer').replace('Cj ', 'Conjunto ').replace('Conj ', 'Conjunto ').replace('DeLosCojones', 'De Los Cojones').replace('Bombachasa', 'Bombachas');

  let descripcion = `Prenda de alta calidad diseñada para brindar comodidad y estilo. Ideal para el día a día.`;
  if (categoria === "Deportiva") {
    descripcion = `Indumentaria deportiva de alta performance. Tejido diseñado para acompañar tus movimientos, brindando máximo confort durante tus entrenamientos.`;
  } else if (categoria === "Interior") {
    descripcion = `Ropa interior confeccionada con materiales suaves y respirables para garantizar la máxima comodidad durante todo el día. Ajuste perfecto y diseño moderno.`;
  }
  
  if (lowerBase.includes('jean')) {
     descripcion = `Pantalón de jean con un calce perfecto y resistente, ideal para un look casual y urbano sin perder comodidad.`;
  }

  const cleanName = lowerBase.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const finalFilename = `${cleanName}${path.extname(filename)}`;

  return { finalFilename, nombreReal, categoria, genero, descripcion };
}

for (const file of files) {
  const oldPath = path.join(TEMP_DIR, file);
  const stats = fs.statSync(oldPath);
  
  if (stats.isFile()) {
    const { finalFilename, nombreReal, categoria, genero, descripcion } = generateProductInfo(file);
    const newPath = path.join(DEST_DIR, finalFilename);
    
    // Copy file instead of moving just in case
    fs.copyFileSync(oldPath, newPath);
    
    ropaData.push({
      id: `ropa-${finalFilename.replace(path.extname(finalFilename), '')}-${Date.now().toString().slice(-4)}`,
      nombre: nombreReal,
      precio: 0,
      imagen: `/productos/ropa/${finalFilename}`,
      categoria: categoria,
      genero: genero,
      stock: true,
      talles: ["S", "M", "L", "XL"],
      colores: ["A definir"],
      descripcion: descripcion
    });
  }
}

fs.writeFileSync(JSON_FILE, JSON.stringify(ropaData, null, 2), 'utf8');
console.log(`Rebuilt ropa.json with ${ropaData.length} items.`);

// Remove temp dir
try {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
} catch(e) {}

const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../ropa_temp3');
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

// Unified Price Mapping
const priceMap = [
  // Underwear (from chat)
  { match: "colales", precio: 3500 }, // colaless, colales
  { match: "bombacha", match2: "nena", precio: 3000 },
  { match: "bombi", match2: "nena", precio: 3000 },
  { match: "infantil", precio: 3000 }, // bombachainfantil
  { match: "bombacha", match2: "señora", precio: 5000 },
  { match: "bombacha", match2: "senora", precio: 5000 },
  { match: "triang", precio: 9000 }, // triangulito, trianguliti, triang, triangulo
  { match: "caja", precio: 15000 }, // armados con caja
  { match: "boxer", precio: 5000 },
  { match: "pijama", precio: 15000 },
  { match: "microfibra", precio: 0 }, // no sabe el precio

  // Sportswear (from screenshots)
  { match: "jean", match2: "elastico", precio: 24000 },
  { match: "jean", match2: "celeste", precio: 25000 },
  { match: "jean", match2: "rotura", precio: 25000 },
  { match: "jean", match2: "blanco", precio: 26000 },
  { match: "jean", precio: 24000 },
  
  { match: "musculosa", match2: "hombre", match3: "combinada", precio: 7500 },
  { match: "musculosa", match2: "combinada", precio: 7500 }, 
  { match: "musculosa", match2: "celeste", precio: 8500 }, 
  { match: "musculosa", match2: "dama", precio: 9000 }, 
  { match: "musculosa", match2: "mujer", precio: 8500 },
  
  { match: "remera", match2: "cojones", precio: 19000 },
  { match: "distrit", precio: 19000 }, 
  { match: "district", precio: 19000 }, 
  { match: "remera", match2: "bordad", precio: 15000 }, 
  { match: "remera", match2: "combinada", precio: 19000 },
  { match: "remera", match2: "dry", match3: "fit", precio: 10000 }, 
  { match: "remera", match2: "algodon", precio: 9500 }, 
  { match: "remera", match2: "niño", precio: 6000 }, 
  { match: "remera", match2: "lycra", precio: 15000 }, 
  { match: "remera", match2: "clavicula", precio: 8500 }, 
  { match: "remera", match2: "deportiva", precio: 10000 },
  { match: "remera", match2: "lisa", precio: 8000 }, 
  { match: "remera", precio: 10000 }, 
  
  { match: "buzo", match2: "hombre", precio: 30000 }, 
  { match: "buzo", precio: 30000 }, 
  
  { match: "pantalon", match2: "buzo", precio: 19000 }, 
  { match: "pantalon", precio: 19000 },
  
  { match: "short", match2: "hombre", precio: 7500 }, 
  { match: "short", match2: "combinad", precio: 8500 }, 
  { match: "short", match2: "orianne", precio: 24000 }, 
  { match: "short", match2: "deportivo", precio: 7500 }, 
  { match: "short", precio: 7500 },
  
  { match: "biker", match2: "dama", precio: 12000 },
  { match: "biker", match2: "estampada", precio: 12000 },
  { match: "biker", precio: 15000 },
  
  { match: "calza", match2: "pescadora", precio: 13500 },
  { match: "pescadora", precio: 13500 },
  { match: "calza", match2: "3/4", precio: 13500 },
  { match: "calza", match2: "estampada", precio: 13500 },
  { match: "calza", match2: "detalle", precio: 13500 },
  { match: "calza", precio: 13500 },
  
  { match: "conjunto", match2: "hombre", precio: 15000 }, 
  { match: "conjunto", precio: 15000 }, // Default if not triang or caja
  
  { match: "top", precio: 10000 },
];

function generateProductInfo(filename) {
  const base = path.basename(filename, path.extname(filename));
  const spaced = base.replace(/([A-Z])/g, ' $1').trim().replace(/_/g, ' ').replace(/-/g, ' ');
  const titleWords = spaced.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  let nombreReal = titleWords.join(' ').replace('  ', ' ');
  
  const lowerBase = base.toLowerCase();
  
  let categoria = "Deportiva";
  let genero = "Unisex";
  
  if (lowerBase.includes('dama') || lowerBase.includes('mujer') || lowerBase.includes('biker') || lowerBase.includes('calza') || lowerBase.includes('pescadora') || lowerBase.includes('triang') || lowerBase.includes('bomb') || lowerBase.includes('conjarmado') || lowerBase.includes('conjuntoarmado') || lowerBase.includes('cjarmado') || lowerBase.includes('senora') || lowerBase.includes('señora') || lowerBase.includes('colales') || lowerBase.includes('microfibra') || lowerBase.includes('nena') || lowerBase.includes('infantil')) {
    genero = "Mujer";
  } 
  if (lowerBase.includes('hombre') || lowerBase.includes('boxer') || lowerBase.includes('cojones')) {
    genero = "Hombre";
  }

  if (lowerBase.includes('boxer') || lowerBase.includes('pijama') || lowerBase.includes('bomb') || lowerBase.includes('triang') || lowerBase.includes('conjarmado') || lowerBase.includes('cjarmado') || lowerBase.includes('conjuntoarmado') || lowerBase.includes('colales') || lowerBase.includes('microfibra') || lowerBase.includes('medias')) {
    categoria = "Interior";
  } else {
    categoria = "Deportiva";
  }

  nombreReal = nombreReal.replace('Dama', 'Mujer').replace('Cj ', 'Conjunto ').replace('Conj ', 'Conjunto ').replace('DeLosCojones', 'De Los Cojones').replace('Bombachasa', 'Bombachas').replace('Colales', 'Colaless').replace('Colalesss', 'Colaless').replace('Bombi ', 'Bombacha ').replace('Conjunti ', 'Conjunto ').replace('Conjunto i ', 'Conjunto ');

  let descripcion = `Prenda de alta calidad diseñada para brindar comodidad y estilo. Ideal para el día a día.`;
  if (categoria === "Deportiva") {
    descripcion = `Indumentaria deportiva de alta performance. Tejido diseñado para acompañar tus movimientos, brindando máximo confort durante tus entrenamientos.`;
  } else if (categoria === "Interior") {
    descripcion = `Ropa interior confeccionada con materiales suaves y respirables para garantizar la máxima comodidad durante todo el día. Ajuste perfecto y diseño moderno.`;
  }
  if (lowerBase.includes('jean')) {
     descripcion = `Pantalón de jean con un calce perfecto y resistente, ideal para un look casual y urbano sin perder comodidad.`;
  }

  let precio = 0;
  for (const map of priceMap) {
    if (lowerBase.includes(map.match)) {
      if (map.match2) {
        if (lowerBase.includes(map.match2)) {
          if (map.match3) {
            if (lowerBase.includes(map.match3)) {
              precio = map.precio; break;
            }
          } else {
            precio = map.precio; break;
          }
        }
      } else {
        precio = map.precio; break;
      }
    }
  }

  const cleanName = lowerBase.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const finalFilename = `${cleanName}${path.extname(filename)}`;

  return { finalFilename, nombreReal, categoria, genero, descripcion, precio };
}

for (const file of files) {
  const oldPath = path.join(TEMP_DIR, file);
  const stats = fs.statSync(oldPath);
  
  if (stats.isFile()) {
    const { finalFilename, nombreReal, categoria, genero, descripcion, precio } = generateProductInfo(file);
    const newPath = path.join(DEST_DIR, finalFilename);
    
    fs.copyFileSync(oldPath, newPath);
    
    ropaData.push({
      id: `ropa-${finalFilename.replace(path.extname(finalFilename), '')}-${Date.now().toString().slice(-4)}`,
      nombre: nombreReal,
      precio: precio,
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

try {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
} catch(e) {}

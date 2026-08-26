const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

// Mappings from images
const mappings = [
  { match: "jean", match2: "elastico", precio: 24000 },
  { match: "jean", match2: "celeste", precio: 25000 }, // recto con pinzas celeste
  { match: "jean", match2: "rotura", precio: 25000 },
  { match: "jean", match2: "blanco", precio: 26000 }, // chupin/oxford blanco
  { match: "jean", precio: 24000 }, // fallback
  
  { match: "musculosa", match2: "hombre", match3: "combinada", precio: 7500 }, // musculosa combinada hombre
  { match: "musculosa", match2: "combinada", precio: 7500 }, 
  { match: "musculosa", match2: "celeste", precio: 8500 }, // musculosas mujer gris y celeste
  { match: "musculosa", match2: "dama", precio: 9000 }, // musculosa dama
  { match: "musculosa", match2: "mujer", precio: 8500 },
  
  { match: "remera", match2: "cojones", precio: 19000 },
  { match: "remera", match2: "district", precio: 19000 }, // or 15000, depending on image
  { match: "remera", match2: "bordad", precio: 15000 }, // remera bordada
  { match: "remera", match2: "combinada", precio: 19000 },
  { match: "remera", match2: "dry", match3: "fit", precio: 10000 }, // remera dry fit
  { match: "remera", match2: "algodon", precio: 9500 }, // remera algodon (blanca?)
  { match: "remera", match2: "niño", precio: 6000 }, 
  { match: "remera", match2: "lycra", precio: 15000 }, 
  { match: "remera", match2: "clavicula", precio: 8500 }, 
  { match: "remera", match2: "deportiva", precio: 10000 },
  { match: "remera", match2: "lisa", precio: 8000 }, 
  { match: "remera", precio: 10000 }, // default fallback for remeras
  
  { match: "buzo", match2: "hombre", precio: 30000 }, // buzo roma
  { match: "buzo", precio: 30000 }, // default buzo
  
  { match: "pantalon", match2: "buzo", precio: 19000 }, // pantalon argent frizado
  { match: "pantalon", precio: 19000 },
  
  { match: "short", match2: "hombre", precio: 7500 }, // short deportivo hombre
  { match: "short", match2: "combinad", precio: 8500 }, // short combinada
  { match: "short", match2: "orianne", precio: 24000 }, 
  { match: "short", match2: "deportivo", precio: 7500 }, // fallback
  { match: "short", precio: 7500 },
  
  { match: "biker", match2: "dama", precio: 12000 },
  { match: "biker", match2: "estampada", precio: 12000 },
  { match: "biker", precio: 15000 }, // Biker general 15000 (Image 1 says Biker 15.000, Image 4 says Calza Biker 12.000)
  
  { match: "calza", match2: "pescadora", precio: 13500 },
  { match: "pescadora", precio: 13500 },
  { match: "calza", match2: "3/4", precio: 13500 },
  { match: "calza", match2: "estampada", precio: 13500 }, // fallback to pescadora price?
  { match: "calza", match2: "detalle", precio: 13500 },
  { match: "calza", precio: 13500 },
  
  { match: "conjunto", match2: "hombre", precio: 15000 }, // assuming 15k
  { match: "conjunto", precio: 15000 },
  
  { match: "top", precio: 10000 }, // Top Tiras Lau
];

let updatedCount = 0;
let missingPrices = [];

data.forEach(item => {
  // If price is already set (from previous script, e.g. underwear), keep it unless it's 0.
  // We'll only update items that have price 0 or if we confidently match them.
  if (item.precio !== 0 && item.precio !== undefined) {
    // Underwear was updated, keep it
    return;
  }

  const nombre = item.nombre.toLowerCase();
  let found = false;

  for (const map of mappings) {
    if (nombre.includes(map.match)) {
      if (map.match2) {
        if (nombre.includes(map.match2)) {
          if (map.match3) {
            if (nombre.includes(map.match3)) {
              item.precio = map.precio;
              found = true; break;
            }
          } else {
            item.precio = map.precio;
            found = true; break;
          }
        }
      } else {
        item.precio = map.precio;
        found = true; break;
      }
    }
  }

  if (found) {
    console.log(`Updated ${item.nombre} -> $${item.precio}`);
    updatedCount++;
  } else {
    // If not found, log it so we can report back to the user
    missingPrices.push(item.nombre);
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nUpdated ${updatedCount} products.`);
if (missingPrices.length > 0) {
  console.log(`\nItems with NO match (still $0):`);
  missingPrices.forEach(m => console.log(`- ${m}`));
}

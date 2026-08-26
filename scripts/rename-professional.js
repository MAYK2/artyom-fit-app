const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

let updated = 0;

data.forEach(item => {
  let oldName = item.nombre;
  let newName = oldName;

  // Replace "Nena" / "Infantil" related
  newName = newName.replace(/Bombacha Nena/gi, 'Bombacha Niña Clásica');
  newName = newName.replace(/Bombi Nena/gi, 'Bombacha Niña');
  
  // Replace "Señora" / "Senora"
  newName = newName.replace(/Bombachas De Señora/gi, 'Bombacha Confort Clásica');
  newName = newName.replace(/Bombachas De Senora/gi, 'Bombacha Confort Clásica');
  
  // Minor styling for other stuff
  newName = newName.replace(/1787684277661\(1\)/g, 'Prenda Deportiva (Por Definir)');
  newName = newName.replace(/Distrit Sol/gi, 'District Sol');
  newName = newName.replace(/Trianguliti/gi, 'Triangulito');
  
  // Capitalize properly just in case
  newName = newName.replace(/\bDe Los Cojones\b/gi, 'De Los Cojones');

  if (oldName !== newName) {
    item.nombre = newName;
    console.log(`Renamed: "${oldName}" -> "${newName}"`);
    updated++;
  }
});

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${updated} names.`);

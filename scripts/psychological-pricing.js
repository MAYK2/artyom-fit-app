const fs = require('fs');
const path = require('path');

function applyPsychologicalPricing(filePath) {
  const file = path.join(__dirname, filePath);
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let updated = 0;

  data.forEach(item => {
    if (item.precio > 0) {
      // First, round up to nearest 1000 to ensure we have a clean number
      const base = Math.ceil(item.precio / 1000) * 1000;
      // Subtract 100 for the psychological effect (.900)
      const psyPrice = base - 100;
      
      if (item.precio !== psyPrice) {
        console.log(`[${path.basename(filePath)}] ${item.nombre}: ${item.precio} -> ${psyPrice}`);
        item.precio = psyPrice;
        updated++;
      }
    }
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  return updated;
}

const ropaUpdated = applyPsychologicalPricing('../data/ropa.json');
const suplesUpdated = applyPsychologicalPricing('../data/suplementos.json');

console.log(`\nApplied psychological pricing to ${ropaUpdated} clothes and ${suplesUpdated} supplements.`);

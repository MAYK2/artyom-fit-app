const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '../data/ropa.json');
let data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

const originalLength = data.length;
data = data.filter(item => !item.id.includes('1787684277661'));

fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Removed ${originalLength - data.length} item(s) from catalog.`);

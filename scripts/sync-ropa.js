const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../ropa_temp');
const DEST_DIR = path.join(__dirname, '../public/productos/ropa');
const JSON_FILE = path.join(__dirname, '../data/ropa.json');

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Function to sanitize filename
function sanitizeFilename(name) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  const sanitizedBase = base.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  return `${sanitizedBase}${ext}`;
}

async function syncRopa() {
  if (!fs.existsSync(TEMP_DIR)) {
    console.log('No ropa_temp directory found. Assuming images are already placed.');
    // We can also sync directly from DEST_DIR in the future
  } else {
    // Process temp files
    const files = fs.readdirSync(TEMP_DIR);
    console.log(`Found ${files.length} files in temp folder. Processing...`);

    for (const file of files) {
      const oldPath = path.join(TEMP_DIR, file);
      const stats = fs.statSync(oldPath);
      if (stats.isFile()) {
        const cleanName = sanitizeFilename(file);
        const newPath = path.join(DEST_DIR, cleanName);
        
        // Move file
        fs.renameSync(oldPath, newPath);
        console.log(`Moved: ${file} -> ${cleanName}`);
      }
    }
    
    // Remove temp directory if empty
    try {
      fs.rmdirSync(TEMP_DIR);
      console.log('Removed ropa_temp directory.');
    } catch (e) {
      console.log('Could not remove ropa_temp, it might not be empty.');
    }
  }

  // Sync JSON
  let ropaData = [];
  if (fs.existsSync(JSON_FILE)) {
    const rawData = fs.readFileSync(JSON_FILE, 'utf8');
    try {
      ropaData = JSON.parse(rawData);
    } catch(e) {
      console.error('Error parsing ropa.json', e);
      ropaData = [];
    }
  }

  // Get all images in DEST_DIR
  const destFiles = fs.readdirSync(DEST_DIR);
  let newItemsCount = 0;

  for (const file of destFiles) {
    const imagePath = `/productos/ropa/${file}`;
    
    // Check if image is already used
    const isUsed = ropaData.some(item => 
      item.imagen === imagePath || 
      (Array.isArray(item.imagenes) && item.imagenes.includes(imagePath))
    );

    if (!isUsed) {
      const cleanName = path.basename(file, path.extname(file));
      const newItem = {
        id: `ropa-${cleanName}-${Date.now().toString().slice(-4)}`,
        nombre: `Producto a definir (${cleanName})`,
        precio: 0,
        imagen: imagePath,
        categoria: "Ropa",
        stock: true,
        talles: ["S", "M", "L", "XL"],
        colores: ["A definir"],
        descripcion: "Descripción a definir..."
      };
      ropaData.push(newItem);
      newItemsCount++;
    }
  }

  if (newItemsCount > 0) {
    fs.writeFileSync(JSON_FILE, JSON.stringify(ropaData, null, 2), 'utf8');
    console.log(`Added ${newItemsCount} new items to ropa.json.`);
  } else {
    console.log('No new items to add to ropa.json.');
  }
}

syncRopa().catch(console.error);

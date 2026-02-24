import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = '/home/diego/.gemini/antigravity/brain/b4849179-60a5-4425-a31c-12539e7ea4c5/media__1771892482255.jpg';
const destPath = path.join(__dirname, '../public/logo-rl.jpg');

try {
    fs.mkdirSync(path.join(__dirname, '../public'), { recursive: true });
    fs.copyFileSync(sourcePath, destPath);
    console.log('✅ El logo ha sido copiado exitosamente a public/logo-rl.jpg');
} catch (error) {
    console.error('❌ Error al copiar el logo:', error);
}

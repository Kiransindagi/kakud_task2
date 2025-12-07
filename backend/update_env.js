const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');

let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
if (!content.includes('GOOGLE_CLIENT_ID')) {
    content += '\nGOOGLE_CLIENT_ID="25635429969-u22nvltv13cf3p4h6r7uoivof49f1grb.apps.googleusercontent.com"';
    fs.writeFileSync(envPath, content, 'utf8');
    console.log('Added GOOGLE_CLIENT_ID to .env');
} else {
    console.log('GOOGLE_CLIENT_ID already exists');
}

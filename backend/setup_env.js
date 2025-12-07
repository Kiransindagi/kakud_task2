const fs = require('fs');
const content = `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET="supersecretkey"
`;
fs.writeFileSync('.env', content, 'utf8');
console.log('.env created');

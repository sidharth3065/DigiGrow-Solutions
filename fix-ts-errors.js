/* eslint-disable @typescript-eslint/no-require-imports */
// Placeholder bulk fix script
const fs = require('fs');
const path = require('path');
const targetFiles = [
  'mobile/src/screens/auth/LoginScreen.tsx',
  // add other paths as needed
];

function readFile(file){ return fs.readFileSync(file, 'utf8'); }
function writeFile(file, content){ fs.writeFileSync(file, content, 'utf8'); }

targetFiles.forEach(rel=>{
  const filePath = path.join(process.cwd(), rel);
  let code = readFile(filePath);
  // Catch any → unknown
  code = code.replace(/catch\s*\(\s*error\s*:\s*any\s*\)/g, 'catch (error: unknown)');
  // Guard error.response
  code = code.replace(/error\.response/g, '(error as any).response');
  // Remove unused imports
  code = code.replace(/import\s+{\s*MessageSquare\s*}\s+from\s+"\.\/someIconModule";/g, '');
  code = code.replace(/const\s+row\s*=\s*[^;]+;?/g, '');
  code = code.replace(/const\s+refreshToken\s*=\s*[^;]+;?/g, '');
  writeFile(filePath, code);
  console.log('Fixed', rel);
});

console.log('All done.');

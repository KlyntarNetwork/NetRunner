import level from 'level'

import fs from 'fs'




const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const recoveryConfigsPath = path.join(__dirname, 'recovery_configs.json');

// Structure is {chaindataPath, checkpointSID, checkpointHash, sourceUrl}

const recoveryConfigs = JSON.parse(fs.readFileSync(recoveryConfigsPath, 'utf8'));




let chaindata = level(recoveryConfigs.chaindataPath,{valueEncoding:'json'})
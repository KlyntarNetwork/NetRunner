import path from 'path';

import {fileURLToPath} from 'url';

import fs from 'fs';




const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const netRunnerConfigsPath = path.join(__dirname, 'netrunner_configs.json');

const netRunnerConfigs = JSON.parse(fs.readFileSync(netRunnerConfigsPath, 'utf8'));

const baseDir = path.join(__dirname,`X${netRunnerConfigs.testnetDir}`);

const timestampToSet = new Date().getTime();


const updateGenesisTimestamp = () => {
  for (let i = 1; i <= 21; i++) {
    const versionDir = path.join(baseDir, `V${i}`);
    const genesisFilePath = path.join(versionDir, 'GENESIS', 'genesis.json');
    const chainDataDir = path.join(versionDir, 'CHAINDATA');

    if (fs.existsSync(genesisFilePath)) {

      const genesisData = JSON.parse(fs.readFileSync(genesisFilePath, 'utf8'));
      genesisData.FIRST_EPOCH_START_TIMESTAMP = timestampToSet;
    
      fs.writeFileSync(genesisFilePath, JSON.stringify(genesisData, null, 2));
      console.log(`Updated timestamp in ${genesisFilePath}`);
    
    }

    
    if (fs.existsSync(chainDataDir)) {
      fs.rmSync(chainDataDir, { recursive: true, force: true });
      console.log(`Deleted CHAINDATA directory in ${versionDir}`);
    }

  }

  console.log('Timestamps updated and CHAINDATA directories deleted');
};

updateGenesisTimestamp();
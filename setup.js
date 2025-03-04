import path from 'path';

import {fileURLToPath} from 'url';

import fs from 'fs';




const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const netRunnerConfigsPath = path.join(__dirname, 'netrunner_configs.json');
const netRunnerConfigs = JSON.parse(fs.readFileSync(netRunnerConfigsPath, 'utf8'));



const directoryForTestnet = path.join(__dirname, `X${netRunnerConfigs.testnetDir}`);
const directoryWithSourceFiles = path.join(__dirname, `files/testnets/${netRunnerConfigs.testnetDir}`);


const copyFile = (src, dest) => fs.copyFileSync(src, dest);




let numberOfNodes = +(netRunnerConfigs.testnetDir.split('V')[1]);

if (!fs.existsSync(directoryForTestnet)) fs.mkdirSync(directoryForTestnet);



for (let i = 1 ; i <= numberOfNodes ; i++) {

  // Here will be subdirectories for files for each node in network
  const nodeDirectory = path.join(directoryForTestnet, `V${i}`);    

  if (!fs.existsSync(nodeDirectory)) fs.mkdirSync(nodeDirectory);

  // For each subdirectory - create subdirs for genesis and configs

  const genesisDir = path.join(nodeDirectory, 'GENESIS');
  const configsDir = path.join(nodeDirectory, 'CONFIGS');

  if (!fs.existsSync(genesisDir)) fs.mkdirSync(genesisDir);
  if (!fs.existsSync(configsDir)) fs.mkdirSync(configsDir);


  // ============= 1. Copy genesis

  const genesisSrc = path.join(directoryWithSourceFiles, 'genesis.json');
  const genesisDest = path.join(genesisDir, 'genesis.json');
  
  copyFile(genesisSrc, genesisDest);

  // ============= 2. Copy configs for VMs

  let vmsConfigs = ['kly_wvm.json','kly_evm.json'];

  vmsConfigs.forEach(file => {
    const src = path.join(__dirname, `files/common_files/${file}`);
    const dest = path.join(configsDir, file);
    copyFile(src, dest);
  });

  // ============= 3. Copy node configs

  const nodeConfigsSrc = path.join(directoryWithSourceFiles, `configs_for_nodes/config_${i}.json`);
  const nodeConfigsDest = path.join(configsDir, 'config.json');
  
  copyFile(nodeConfigsSrc, nodeConfigsDest);
  
}

console.log(`Directories setup complete for testnet size ${netRunnerConfigs.testnetDir}`);
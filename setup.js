const fs = require('fs');
const path = require('path');


const baseDir = path.join(__dirname, 'TESTNET_V21');

const filesDir = path.join(__dirname, 'files');

const filesToCopy = {
  GENESIS: 'genesis.json',
  CONFIGS: ['kly_wvm.json', 'kly_evm.json']
};


const copyFile = (src, dest) => {
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
};


const setupDirectories = () => {
  for (let i = 1; i <= 1; i++) {
    const versionDir = path.join(baseDir, `V${i}`);
    const genesisDir = path.join(versionDir, 'GENESIS');
    const configsDir = path.join(versionDir, 'CONFIGS');

    if (!fs.existsSync(genesisDir)) fs.mkdirSync(genesisDir);
    if (!fs.existsSync(configsDir)) fs.mkdirSync(configsDir);

    const genesisSrc = path.join(filesDir, filesToCopy.GENESIS);
    const genesisDest = path.join(genesisDir, filesToCopy.GENESIS);
    copyFile(genesisSrc, genesisDest);

    filesToCopy.CONFIGS.forEach(file => {
      const src = path.join(filesDir, file);
      const dest = path.join(configsDir, file);
      copyFile(src, dest);
    });
  }

  console.log('Directories setup complete.');
};

setupDirectories();

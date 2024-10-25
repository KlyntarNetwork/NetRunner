const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, process.argv[2]);

const updateGenesisTimestamp = () => {
  for (let i = 1; i <= 21; i++) {
    const versionDir = path.join(baseDir, `V${i}`);
    const genesisFilePath = path.join(versionDir, 'GENESIS', 'genesis.json');
    const chainDataDir = path.join(versionDir, 'CHAINDATA');

    if (fs.existsSync(genesisFilePath)) {

      const genesisData = JSON.parse(fs.readFileSync(genesisFilePath, 'utf8'));
      genesisData.FIRST_EPOCH_START_TIMESTAMP = new Date().getTime();
    
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
import fs from 'fs';

import { spawn } from 'child_process';

import path from 'path';

import {fileURLToPath} from 'url';





const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const netRunnerConfigsPath = path.join(__dirname, 'netrunner_configs.json');

const netRunnerConfigs = JSON.parse(fs.readFileSync(netRunnerConfigsPath, 'utf8'));

const CORE_PATH = netRunnerConfigs.corePath;

const KLY_MODE = netRunnerConfigs.mode;



// Directory with subdirs for nodes
const baseDir = path.join(__dirname,`X${netRunnerConfigs.testnetDir}`);



// Set full pathes to dirs

let NODES_DIRS = [`${baseDir}/V1`, `${baseDir}/V2`];

if(netRunnerConfigs.testnetDir==='TESTNET_V5'){

    NODES_DIRS = [];

    for(let i = 1; i <= 5 ; i++) {

        NODES_DIRS.push(`${baseDir}/V${i}`);

    }

} else if (netRunnerConfigs.testnetDir==='TESTNET_V21'){

    NODES_DIRS = [];

    for(let i = 1; i <= 21 ; i++) {

        NODES_DIRS.push(`${baseDir}/V${i}`);

    }

}


const childProcesses = [];


// Main function to run nodes as a subprocesses
function runKlyntarWithEnv(pathToChainDirectory) {

    const env = { ...process.env, SYMBIOTE_DIR: pathToChainDirectory, KLY_MODE }; // set process env vars

    const klyntarProcess = spawn('node',[CORE_PATH], { env, windowsHide: true });

    
    childProcesses.push(klyntarProcess);

    // Handlers to work with IO

    klyntarProcess.stdout.on('data', (data) => {
        console.log(`[${pathToChainDirectory}]: ${data}`);
    });

    klyntarProcess.stderr.on('data', (data) => {
        console.error(`[${pathToChainDirectory}]: ${data}`);
    });

    klyntarProcess.on('close', (code) => {
        console.log(`[${pathToChainDirectory}]: ${code}`);
    });

}


NODES_DIRS.forEach(runKlyntarWithEnv);
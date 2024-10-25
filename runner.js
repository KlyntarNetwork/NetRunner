const { spawn } = require('child_process');

const path = require('path');



const CORE_PATH = 'C:/Users/MI/MyProjects/KlyntarCore/klyn74r.js'; // set FULL path to klyn74r.js

const KLY_MODE = 'testnet';



// Directory with subdirs for nodes
const baseDir = path.join(__dirname, 'TESTNET_V2');



// Set full pathes to dirs

const NODES_DIRS = [
    
    `${baseDir}/V1`,
    `${baseDir}/V2`

];


const childProcesses = [];


// Main function to run nodes as a subprocesses
function runKlyntarWithEnv(symbioteDir) {

    const env = { ...process.env, SYMBIOTE_DIR: symbioteDir, KLY_MODE }; // set process env vars

    const klyntarProcess = spawn('node',[CORE_PATH], { env });

    
    childProcesses.push(klyntarProcess);

    // Handlers to work with IO

    klyntarProcess.stdout.on('data', (data) => {
        console.log(`[${symbioteDir}]: ${data}`);
    });

    klyntarProcess.stderr.on('data', (data) => {
        console.error(`[${symbioteDir}]: ${data}`);
    });

    klyntarProcess.on('close', (code) => {
        console.log(`[${symbioteDir}]: ${code}`);
    });

}


NODES_DIRS.forEach(runKlyntarWithEnv);

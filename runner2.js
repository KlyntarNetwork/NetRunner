import { setupDirectories } from "./setup.js";

import { updateGenesisTimestamp } from "./update_timestamp_in_genesis.js";


setupDirectories();

updateGenesisTimestamp();


import("./runner.js");
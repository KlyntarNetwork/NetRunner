# Intro

This collection of files & scripts should be used to help with local testnet management. This repository will delete

### How to use `update_timestamp_in_genesis.js`

This script accept directory name as parameter to clear the `CHAINDATA` in subdirectories and update the timestamp in genesis. 

1. To update timestamp in genesis for testnet with 2 nodes

```shell
node update_timestamp_in_genesis.js TESTNET_V2
```


2. To update timestamp in genesis for testnet with 5 nodes

```shell
node update_timestamp_in_genesis.js TESTNET_V5
```

3. To update timestamp in genesis for testnet with 21 nodes

```shell
node update_timestamp_in_genesis.js TESTNET_V21
```

After all you can run appropriate network by running:

```shell
node runner.js TESTNET_V... # possible params - TESTNET_V2, TESTNET_V5, TESTNET_V21
```
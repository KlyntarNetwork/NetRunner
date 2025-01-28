# Intro

This is the collection of files & scripts that should be used to help with local testnet management

<br/><br/>
<br/><br/>

# 1. Before run - you should build the Klyntar core

See https://docs.klyntar.org/build-core-and-join-network/run-kly-node

# 2. After build, omit the last part about preparing configs and genesis:

![alt text](image.png)

# 3. Switch to branch in core `dev_cloud`

```shell
git checkout dev_cloud
```

And install `web1337` by running:

```shell
pnpm install
```

> This is to generate mock transactions and fill the blocks

# 4. Now clone this repository in some another directory

```shell
git clone https://github.com/KlyntarNetwork/NetRunner.git

cd NetRunner
```

# 5. Prepare netrunner configs

See `netrunner_configs.json`

```json
{
    "corePath":"/full/path/to/KlyntarCore/klyntar_core.js",
    "mode":"testnet",
    "testnetDir":"TESTNET_V5"
}
```

Depending on network size - switch `testnetDir` to 3 possible options:

1. `TESTNET_V2`
2. `TESTNET_V5`
3. `TESTNET_V21`

<br/><br/>

# 6. Launch testnet with a single shard and 2 validators

1. Your `netrunner_configs.json` should look like this:

```json
{
    "corePath":"/full/path/to/KlyntarCore/klyntar_core.js",
    "mode":"testnet",
    "testnetDir":"TESTNET_V2",
    "nodesIdsToDisable":[]
}
```

2. Then call

```shell
node setup.js
```
This should prepare directories for nodes of your testnet

3. Now update the timestamp

Change the timestamp for the first epoch for each node in your network

```shell
node update_timestamp_in_genesis.js
```

4. Finally - run your network

Just from a single shell

```shell
node runner.js 
```

<br/><br/>

# 7. Launch testnet with a 3 shards and 5 validators

Your `netrunner_configs.json` should look like this:

```json
{
    "corePath":"/full/path/to/KlyntarCore/klyntar_core.js",
    "mode":"testnet",
    "testnetDir":"TESTNET_V5",
    "nodesIdsToDisable":[]
}
```

Then repeat:

```shell
node setup.js

node update_timestamp_in_genesis.js

node runner.js
```

<br/><br/>

# 8. Launch testnet with a single shard and 21 validators (almost prod)

Your `netrunner_configs.json` should look like this:

```json
{
    "corePath":"/full/path/to/KlyntarCore/klyntar_core.js",
    "mode":"testnet",
    "testnetDir":"TESTNET_V21",
    "nodesIdsToDisable":[]
}
```

Then repeat:

```shell
node setup.js

node update_timestamp_in_genesis.js

node runner.js
```

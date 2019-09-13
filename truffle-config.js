require('chai/register-should');

const ganache = require('ganache-cli');
const memdown = require("memdown");

const { GSNDevProvider } = require('@openzeppelin/gsn-provider');

const opts = {
  accounts: [
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501201"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501202"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501203"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501204"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501205"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501206"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501207"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501208"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501209"
    },
    // ------- GSN ------------------------------------------
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x956b91cb2344d7863ea89e6945b753ca32f6d74bb97a59e59e04903ded14ad00"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x956b91cb2344d7863ea89e6945b753ca32f6d74bb97a59e59e04903ded14ad01"
    },
    {
      balance: 0xD3C21BCECCEDA1000000,
      secretKey: "0x956b91cb2344d7863ea89e6945b753ca32f6d74bb97a59e59e04903ded14ad02"
    },
  ]
}

const solcStable = {
  version: '0.5.11',
};

const solcNightly = {
  version: 'nightly',
  docker: true,
};

const useSolcNightly = process.env.SOLC_NIGHTLY === 'true';

module.exports = {
  networks: {
    development: {
      provider: new GSNDevProvider('http://localhost:8545', {
        txfee: 70,
        useGSN: false,
        // The last two accounts defined in test.sh
        ownerAddress: '0x26be9c03ca7f61ad3d716253ee1edcae22734698',
        relayerAddress: '0xdc5fd04802ea70f6e27aec12d56716624c98e749',
      }),
      network_id: '*', // eslint-disable-line camelcase
    },
    coverage: {
      provider: new GSNDevProvider('http://localhost:8555', {
        txfee: 70,
        useGSN: false,
        // The last two accounts defined in test.sh
        ownerAddress: '0x26be9c03ca7f61ad3d716253ee1edcae22734698',
        relayerAddress: '0xdc5fd04802ea70f6e27aec12d56716624c98e749',
      }),
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      network_id: '*', // eslint-disable-line camelcase
    },
    ganache: {
      provider: ganache.provider(opts),
      network_id: '*'
    }
  },
  plugins: ["solidity-coverage"],

  compilers: {
    solc: useSolcNightly ? solcNightly : solcStable,
  },
};

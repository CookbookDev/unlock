/* eslint-disable no-console */
/**
 * This file generates the files src/abis.js, src/__tests__/helpers/bytecode.js and src/deployableBytecode.js
 * by extracting them from the packages below.
 *
 * On contract release, require the contract and update "toCompress" below
 */

const ethers = require('ethers')
const fs = require('fs')
const path = require('path')
const abis = require('@unlock-protocol/contracts')

const unlockVersions = [
  'v4',
  'v6',
  'v7',
  'v8',
  'v9',
  'v10',
  'v11',
  'v12',
  'v13',
]
const publicLockVersions = [
  'v4',
  'v6',
  'v7',
  'v8',
  'v9',
  'v10',
  'v11',
  'v12',
  'v13',
  'v14',
]

const data = {
  PublicLock: publicLockVersions.reduce(
    (versions, v) => ({
      ...versions,
      [v]: parseABI('PublicLock', v),
    }),
    {}
  ),
  Unlock: unlockVersions.reduce(
    (versions, v) => ({
      ...versions,
      [v]: parseABI('Unlock', v),
    }),
    {}
  ),
}

function formatTypes(types) {
  return types
    .map((type) => `${type.type}${type.name ? ` ${type.name}` : ''}`)
    .join(',')
}

function formatEventTypes(types) {
  return types
    .map((type) => `${type.type}${type.indexed ? ' indexed' : ''} ${type.name}`)
    .join(',')
}

function formatSignature(sig) {
  if (sig.type === 'event') {
    if (sig.anonymous) return false // can't filter on anonymous events so ignore them
    return `event ${sig.name} (${formatEventTypes(sig.inputs)})`
  }
  if (sig.type === 'error') {
    // support for solidity custom errors using functions
    // https://blog.soliditylang.org/2021/04/21/custom-errors/
    return `error ${sig.name}(${formatTypes(sig.inputs)})`
  }
  let ret = `function ${sig.name}(${formatTypes(sig.inputs)})`
  if (sig.constant) ret += ' constant'
  if (sig.stateMutability !== 'nonpayable') ret += ` ${sig.stateMutability}`
  if (sig.outputs.length) {
    ret += ` returns (${formatTypes(sig.outputs)})`
  }
  return ret
}

function parseABI(contractName, version) {
  const abi = abis[`${contractName}${version.toUpperCase()}`]
  const signatures = abi.abi
    .filter((f) => ['function', 'event', 'error'].includes(f.type))
    .map(formatSignature)
    .filter((f) => f)

  return {
    contractName,
    version,
    ...abi,
    signatures,
  }
}

const parseData = (modifier) => {
  const parsed = {}

  Object.keys(data)
    // loop through contracts
    .forEach((contractName) => {
      // initialize
      parsed[contractName] = parsed[contractName] || {}
      // loop through versions
      Object.keys(data[contractName]).forEach(
        (version) =>
          // get only what we want
          (parsed[contractName][version] = modifier(
            data[contractName][version]
          ))
      )
    })

  return parsed
}

// parse the various data
const parsedAbis = parseData(
  ({ contractName, signatures, deployedBytecode }) => ({
    contractName,
    abi: signatures,
    bytecodeHash: ethers.utils.sha256(deployedBytecode),
  })
)

const doNotModify = `/* eslint-disable */
// This file is auto-generated by ../../../scripts/compressAbi.js
// do not modify directly!
`
console.log('writing abis...')
fs.writeFileSync(
  `${path.dirname(__dirname)}/src/abis.ts`,
  `${doNotModify}
const abis = ${JSON.stringify(parsedAbis, null, 2)}
export default abis`
)
console.log('done')

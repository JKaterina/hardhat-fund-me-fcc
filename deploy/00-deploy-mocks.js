const { getContractAddress } = require("ethers/lib/utils")
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local network, deploying mocks")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        if (
            !developmentChains.includes(network.name) &&
            process.env.ETHERSCAN_API_KEY
        ) {
        }
        log("----------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]

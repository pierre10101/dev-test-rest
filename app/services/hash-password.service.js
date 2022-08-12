const argon2 = require("argon2");
const crypto = require("crypto");
/**
 * Hashing Algorithms configs
 */
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: process.env.HASH_CONFIG_PARALLELISM,
    memoryCost: process.env.HASH_CONFIG_MEMORY_COST, // 64 mb
    timeCost: process.env.HASH_CONFIG_TIME_COST // number of itetations
}
/**
 * Creates a hashed password based on argon2
 * @param {string} password 
 * @returns string
 */
module.exports.hashPassword = async (password) => {
    return argon2.hash(password, {
        ...hashingConfig,
        salt: crypto.randomBytes(16),
    })
}

/**
 * Verifies that a plain text password can decrypt a hashed password and is thus valid
 * @param {string} userPassword 
 * @param {string} savedHashedPassword 
 * @returns boolean
 */
module.exports.verifyPasswordWithHash = async (userPassword, savedHashedPassword) => {
    return argon2.verify(userPassword, savedHashedPassword, hashingConfig);
}
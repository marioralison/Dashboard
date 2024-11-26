const argon2 = require('argon2');

async function hashPassword(password) {
    return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2,
    });
}

const createPassword = async (event ,password) => {
    const hash = await hashPassword(password);
    return hash;
};

module.exports = { createPassword };
const bcrypt = require('bcrypt');

const encrypt = async (texto) => {
  const hash = await bcrypt.hash(texto, 10);

  return hash;
}

const compareHash = async (texto, hash) => {
  return await bcrypt.compare(texto, hash);
}

module.exports = {
  encrypt,
  compareHash
}
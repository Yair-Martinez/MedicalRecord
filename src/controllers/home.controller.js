const pool = require('../config/database');

const getHome = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM test;");
    res.status(200).json(response.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
}

module.exports = {
  getHome,
}
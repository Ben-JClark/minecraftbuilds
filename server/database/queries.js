const { pool } = require("./pool");

/**
 * Query the mysql database to get a list of servers
 * @returns null or a list of servers in json format
 */
async function getServers() {
  console.log("getServers");
  let connection;
  try {
    connection = await pool.getConnection();
    const serverList = (await connection.query("CALL get_servers()"))[0][0];
    return serverList;
  } catch (error) {
    console.log("Error getting serverdata: ", error);
    return null;
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
}

/**
 * Get the long description of a server from MySQL
 * @returns null or the server description in json format
 */
async function getLongDescription(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const descripton = (await connection.query("CALL get_long_description(?)", [id]))[0][0];
    console.log("Got descriptoin: ", descripton);
    return descripton;
  } catch (error) {
    console.log("Error getting long descripton: ", error);
    return null;
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
}

module.exports = { getServers, getLongDescription };

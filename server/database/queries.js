const { pool } = require("./pool");

/**
 * Query the mysql database to get a list of servers
 * @returns null or a list of servers in json format
 */
async function getServers() {
  try {
    const connection = await pool.getConnection();
    const serverList = (await connection.query("CALL get_servers()"))[0][0];
    return serverList;
  } catch (error) {
    console.log("Error getting serverdata: ", error);
    return null;
  } finally {
    if (typeof connection !== "undefined") {
      connection.release();
    }
  }
}

module.exports = { getServers };

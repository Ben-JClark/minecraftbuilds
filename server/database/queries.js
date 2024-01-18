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
    console.log("got pool connection");
    const serverList = (await connection.query("CALL get_servers()"))[0][0];
    console.log("queryed get_servers()");
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

module.exports = { getServers };

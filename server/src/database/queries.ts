import { pool } from "./pool.js";

/**
 * Query the mysql database to get a list of servers
 * @returns null or a list of servers in json format
 */
async function getServers() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [response] = await connection.query("CALL get_servers()");
    if (Array.isArray(response)) {
      return response[0];
    } else {
      console.log("Error: Response from sql was not in array format");
      return null;
    }
  } catch (error) {
    console.log("Error getting serverdata: ", error);
    return null;
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
}

/**
 * Get the long description of a server from MySQL
 * @returns null or the server description in json format
 */
async function getLongDescription(id: number) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [response] = await connection.query("CALL get_long_description(?)", [id]);
    if (Array.isArray(response)) {
      return response[0];
    } else {
      console.log("Error: Response from sql was not in array format");
      return null;
    }
  } catch (error) {
    console.log("Error getting long descripton: ", error);
    return null;
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
}

/**
 * Query the mysql database to get a bases for a particular server
 * @returns null or a list of bases in json format
 */
async function getBases(serverID: number) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [response] = await connection.query("CALL get_bases(?)", [serverID]);
    if (Array.isArray(response)) {
      return response[0];
    } else {
      console.log("Error: Response from sql was not in array format");
      return null;
    }
  } catch (error) {
    console.log("Error getting the list of bases: ", error);
    return null;
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
}

/**
 * Query the mysql database to add a base to the table Bases
 * This query does not add any images
 * @returns null if there is an error, false if mysql couldn't add the base, true if the base was added
 */
async function addBase(
  serverID: number,
  ownerID: number,
  baseName: string,
  baseDescription: string,
  xCord: number,
  zCord: number,
  forSale: boolean,
  purchaseItem: string,
  purchaseMethod: string
) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [response] = await connection.query("CALL add_base(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      serverID,
      ownerID,
      baseName,
      baseDescription,
      xCord,
      zCord,
      forSale,
      purchaseItem,
      purchaseMethod,
    ]);
    if (Array.isArray(response)) {
      const rowsAffected = response[0]; // TODO get the number of rows affected, if 1, then success
      console.log(rowsAffected);
      return true;
    } else {
      console.log("Error: Response from sql was not in array format");
      return null;
    }
  } catch (error) {
    console.log("Error getting the list of bases: ", error);
    return null;
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }
}

export { getServers, getLongDescription, getBases, addBase };

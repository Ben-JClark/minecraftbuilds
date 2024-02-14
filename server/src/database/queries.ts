import { pool } from "./Pool.js";
import type { Base } from "../type_operations/BaseOperations.js";
import { validBase } from "../type_operations/BaseOperations.js";
import { renameImages } from "../file_operations/FileOperations.js";
import type { ServerResponse } from "../Server.js";
import { validServerId } from "../type_operations/ServerOperations.js";

/**
 * Query the mysql database to get a list of servers
 * @returns null or a list of servers in json format
 */
async function getServers(): Promise<ServerResponse> {
  let serverResponse: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  let connection;
  try {
    connection = await pool.getConnection();
    const [response] = (await connection.query("CALL get_servers()")) as any;
    serverResponse.data = response[0];
    serverResponse.statusCode = 200;
  } catch (error) {
    serverResponse.errorMessage = "Error getting the servers from the database";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
    return serverResponse;
  }
}

/**
 * Get the long description of a server from MySQL
 * @returns null or the server description in json format
 */
async function getLongDescription(serverID: number): Promise<ServerResponse> {
  // Validate the serverID
  let serverResponse: ServerResponse = validServerId(serverID);
  if (serverResponse.success !== true) {
    return serverResponse;
  }

  let connection;
  try {
    connection = await pool.getConnection();
    // Query the db for the long description
    const [response] = (await connection.query("CALL get_long_description(?)", [serverID])) as any;
    // return the long descripton and status
    console.log("Setting response data for get long description as: ", response[0][0]);
    serverResponse.data = response[0][0];
    serverResponse.statusCode = 200;
  } catch (error) {
    serverResponse.success = false;
    serverResponse.errorMessage = "Error getting the server description from the database";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
    return serverResponse;
  }
}

/**
 * Query the mysql database to get a bases for a particular server
 * @returns null or a list of bases in json format
 */
async function getBases(serverID: number): Promise<ServerResponse> {
  // Validate the serverID
  let serverResponse: ServerResponse = validServerId(serverID);
  if (serverResponse.success !== true) {
    return serverResponse;
  }

  let connection;
  try {
    connection = await pool.getConnection();
    // Get the bases
    const [response] = (await connection.query("CALL get_bases(?)", [serverID])) as any;
    // return the bases and status
    serverResponse.data = response[0];
    serverResponse.statusCode = 200;
  } catch (error) {
    serverResponse.success = false;
    serverResponse.errorMessage = "Error getting the list of bases";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
    return serverResponse;
  }
}

/**
 * Query the mysql database to add a base to the table Bases and image names to Base_Images via the procedure add_base
 * base names are returned and the localy saved images are renamed to match the db
 * @returns ValidationResult that has a status code and any error messages
 */
async function addBase(base: Base): Promise<ServerResponse> {
  // validate the base passed
  let response: ServerResponse = validBase(base);
  if (response.success !== true) {
    return response;
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [MySQLResponse]: any = await connection.query("CALL add_base(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      base.server_id,
      base.owner_id,
      base.base_name,
      base.base_description,
      base.x_coordinate,
      base.z_coordinate,
      base.for_sale,
      base.purchase_price,
      base.purchase_item,
      base.purchase_method,
      base.image_files.length,
    ]); // MySQL returns the names the images should be renamed to

    // Obtain the new names
    const newNames: string[] = MySQLResponse[0].map((obj: any) => {
      return String(obj.image_name);
    });
    // Rename the images
    response = await renameImages(base.image_files, newNames, "base");
    if (response.success) {
      response.statusCode = 201;
    }
  } catch (error) {
    response.success = false;
    response.errorMessage = "Could not upload the base to the database";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
    return response;
  }
}

export { getServers, getLongDescription, getBases, addBase };

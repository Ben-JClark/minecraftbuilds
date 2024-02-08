import { pool } from "./pool.js";
import type { Base } from "../validation/ValidBase.js";
import { validBase } from "../validation/ValidBase.js";
import type { ValidationResult } from "../validation/TypeValidation.js";

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
async function addBase(base: Base, imageDir: string): Promise<ValidationResult> {
  // validate the base passed
  let response: ValidationResult = validBase(base);
  if (response.validRequest !== true) {
    console.log("Base is not valid: ", response);
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
    response = await renameImages(base.image_files, newNames, "bases");
    if (response.validRequest) {
      response.statusCode = 201;
    }
  } catch (error) {
    console.log("Error getting the list of bases: ", error);
    response.errorMessage = "Could not upload the base to the database";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
    return response;
  }
}

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { rename } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function renameImages(
  currNames: string[],
  newNames: string[],
  folder: "bases" | "shops" | "farms"
): Promise<ValidationResult> {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };

  if (currNames.length === newNames.length) {
    try {
      const renamePromises = currNames.map(async (currName: string, i: number) => {
        const currPath = path.resolve(__dirname, `../../uploads/${folder}/${currName}`);
        const newPath = path.resolve(__dirname, `../../uploads/${folder}/${newNames[i]}`);
        return rename(currPath, newPath);
      });
      await Promise.all(renamePromises);
      // All files renamed successfully
      response.validRequest = true;
    } catch (error) {
      response.errorMessage = "Error storing images";
    }
  } else {
    response.errorMessage = "Error renaming stored images, filenames provided have unequal length";
  }
  console.log("response from queries.ts: ", response);
  return response;
}

export { getServers, getLongDescription, getBases, addBase };

import { Request, Response } from "express";
import { pool } from "../models/Pool.js";
// Import validation functions
import { validServerId } from "../type_validations/MServerValidation.js";
// Import types
import type { ServerResponse } from "../utils/ServerResponseUtils.js";

export async function getServerDescription(req: Request, res: Response): Promise<void> {
  const serverId = parseInt(req.params.serverId);

  // Validate the serverID
  let response: ServerResponse = validServerId(serverId);
  if (response.success === true) {
    let connection;
    try {
      connection = await pool.getConnection();
      // Query the db for the long description
      const [MySQLResponse] = (await connection.query("CALL get_long_description(?)", [serverId])) as any;
      response.data = MySQLResponse[0][0];
      response.statusCode = 200;
    } catch (error) {
      response.success = false;
      response.errorMessage = "Error getting the server description from the database";
    } finally {
      if (connection !== undefined) {
        connection.release();
      }
    }
  }

  res.status(response.statusCode).json(response);
}

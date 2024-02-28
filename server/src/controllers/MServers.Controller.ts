import { Request, Response } from "express";
import { pool } from "../models/Pool.js";
// Import types
import type { ServerResponse } from "../utils/ServerResponseUtils.js";

import { get_servers } from "../models/MServers.model.js";

export async function getServers(req: Request, res: Response): Promise<void> {
  let response: ServerResponse = {
    success: false,
    statusCode: 500,
  };

  let connection;
  try {
    connection = await pool.getConnection();
    response.data = await get_servers(connection);
    response.statusCode = 200;
  } catch (error) {
    response.errorMessage = "Error getting the servers from the database";
  } finally {
    if (connection !== undefined) {
      connection.release();
    }
  }

  res.status(response.statusCode).json(response);
}

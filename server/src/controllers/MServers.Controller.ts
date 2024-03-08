import { NextFunction, Request, Response } from "express";
import { getConnection } from "../models/Pool.js";
import { get_servers } from "../models/MServers.model.js";

/**
 * Sends a list of minecraft servers from the database as a json object
 */
export async function getServers(req: Request, res: Response, next: NextFunction): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    return next(err);
  }
  try {
    const servers = await get_servers(connection);
    res.status(200).json(servers);
  } finally {
    connection.release();
  }
}

import { NextFunction, Request, Response } from "express";
import { getConnection } from "../models/Pool.js";
import { validServerId } from "../type_validations/MServerValidation.js";
import { get_description } from "../models/Home.model.js";

/**
 * Sends a string description of a server in json format
 * @param req contains the server id in the params
 */
export async function getServerDescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  const serverId = parseInt(req.params.serverId);

  try {
    validServerId(serverId);
  } catch (err) {
    return next(err);
  }

  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    return next(err);
  }

  try {
    const description: string = await get_description(connection, serverId);
    res.status(200).json(description);
  } finally {
    connection.release();
  }
}

import { NextFunction, Request, Response } from "express";
import { getConnection } from "../models/Pool.js";
import { renameImages } from "../utils/FileOperations.js";
import { validServerId } from "../type_validations/MServerValidation.js";
import { validBase } from "../type_validations/MBaseValidation.js";
import type { Base } from "../type_validations/MBaseValidation.js";
import { get_bases, add_base } from "../models/Base.model.js";

/**
 * Sends a list of minecraft bases from a server
 * @param req contains the server id in the params
 */
export async function getBases(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Validate the serverID
  const serverId = parseInt(req.params.serverId);
  try {
    validServerId(serverId);
  } catch (error) {
    return next(error);
  }

  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    return next(err);
  }

  try {
    const bases: Base[] = await get_bases(connection, serverId);
    res.status(200).json(bases);
  } finally {
    connection.release();
  }
}

/**
 * Inserts a new minecraft base, base image names, and stores the base images
 * @param req contains the session, server id in params, base properties in the body, and base images in files
 */
export async function addBase(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.session.user) {
    // TODO: use isAuthenticated middleware in routes
    const ownerId = req.session.user.id;

    // Create the base object
    const fileNames: string[] = (req.files as Express.Multer.File[]).map((obj: any) => {
      return obj.filename;
    });
    const base: Base = {
      server_id: parseInt(req.params.serverId),
      owner_id: ownerId,
      base_name: req.body.base_name,
      base_description: req.body.base_description,
      x_coordinate: parseInt(req.body.x_coordinate),
      z_coordinate: parseInt(req.body.z_coordinate),
      for_sale: String(req.body.for_sale).toLocaleLowerCase() === "true",
      purchase_price: parseInt(req.body.purchase_price),
      purchase_item: req.body.purchase_item,
      purchase_method: req.body.purchase_method,
      image_files: fileNames,
    };
    try {
      validBase(base);
    } catch (err) {
      return next(err);
    }

    // Upload the base object
    let connection;
    try {
      connection = await getConnection();
    } catch (err) {
      return next(err);
    }

    try {
      // Obtain the new names
      const newNames: string[] = await add_base(connection, base);
      // Rename the images
      try {
        await renameImages(base.image_files, newNames, "base");
      } catch (err) {
        return next(err);
      }
      res.status(201).send();
    } finally {
      connection.release();
    }
  }
}

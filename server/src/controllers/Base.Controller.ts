import { Request, Response } from "express";
import { pool } from "../models/Pool.js";
// Import file operation functions
import { renameImages } from "../utils/FileOperations.js";
// Import validation functions
import { validServerId } from "../type_validations/MServerValidation.js";
import { validBase } from "../type_validations/MBaseValidation.js";
// Import types
import type { ServerResponse } from "../utils/ServerResponseUtils.js";
import type { Base } from "../type_validations/MBaseValidation.js";
// Import Models
import { get_bases, add_base } from "../models/Base.model.js";

export async function getBases(req: Request, res: Response): Promise<void> {
  // Validate the serverID
  const serverId = parseInt(req.params.serverId);
  let response: ServerResponse = validServerId(serverId);

  // If serverId is valid, get the bases
  if (response.success === true) {
    let connection;
    try {
      connection = await pool.getConnection();
      response.data = await get_bases(connection, serverId);
      response.statusCode = 200;
    } catch (error) {
      response.success = false;
      response.errorMessage = "Error getting the list of bases";
    } finally {
      if (connection !== undefined) {
        connection.release();
      }
    }
  }

  // Send a response back to the client
  res.status(response.statusCode).json(response);
}

export async function addBase(req: Request, res: Response): Promise<void> {
  const ownerId = 1; // TODO: update with actual onwer id

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

  // Validate the base object
  let response: ServerResponse = validBase(base);
  if (response.success === true) {
    // Upload the base object
    let connection;
    try {
      connection = await pool.getConnection();
      // Obtain the new names
      const newNames: string[] = await add_base(connection, base);
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
    }
  }

  // Send a response back to the client
  res.status(response.statusCode).json(response);
}

import type { PoolConnection } from "mysql2/promise";
import type { Base } from "../type_validations/MBaseValidation.js";

async function get_bases(connection: PoolConnection, serverId: number): Promise<Base[]> {
  const [MySQLResponse]: any = await connection.query("CALL get_bases(?)", [serverId]);
  return MySQLResponse[0];
}

/**
 * Uploads a base and the number of images to the db, an array of new image names are returned.
 * The new image names are associated with the base id, you should rename the images you are storing to these names.
 * @param connection
 * @param base the base to be uploaded
 * @returns A string array containing the id's of the base images
 */
async function add_base(connection: PoolConnection, base: Base): Promise<string[]> {
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
  ]);

  const imageNames: string[] = MySQLResponse[0].map((obj: any) => {
    return String(obj.image_name);
  });
  return imageNames;
}

export { get_bases, add_base };

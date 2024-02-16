import { validUnsignedInt, IntUnsignedMax } from "./MysqlTypeValidation.js";
import { ServerResponse } from "../Server.js";

function validServerId(serverId: any): ServerResponse {
  let response: ServerResponse = validUnsignedInt(serverId, IntUnsignedMax.UnsignedSmallIntMax);
  if (response.success === false) {
    response.invalidFeild = "server_id";
  }
  return response;
}

export { validServerId };

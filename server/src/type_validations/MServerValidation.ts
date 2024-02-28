import { validUnsignedInt, IntUnsignedMax } from "./MysqlTypeValidation.js";
import type { ServerResponse } from "../utils/ServerResponseUtils.js";

function validServerId(serverId: unknown): ServerResponse {
  let response: ServerResponse = validUnsignedInt(serverId, IntUnsignedMax.UnsignedSmallIntMax);
  if (response.success === false) {
    response.invalidFeild = "server_id";
  }
  return response;
}

export { validServerId };

type ServerResponse = {
  success: boolean;
  statusCode?: number;
  data?: any | string;
  invalidFeild?: string;
  errorMessage?: string;
};

type ServerMessage = {
  success: boolean;
  invalidFeild?: string;
  errorMessage?: string;
};

/**
 * Returns a ServerMessage made from a ServerResponse or no response.
 * @param response The response form the server or undefined if there isn't any
 * @returns a ServerMessage which contains data from the server response or a generic message
 */
function parseServerMessage(response: ServerResponse | undefined): ServerMessage {
  let newServerMessage: ServerMessage;
  if (response !== undefined) {
    newServerMessage = {
      success: response.success,
      invalidFeild: response.invalidFeild,
      errorMessage: response.errorMessage,
    };
  } else {
    newServerMessage = {
      success: false,
      errorMessage: "Couldn't commmunicate with the server",
    };
  }
  return newServerMessage;
}

export type { ServerResponse, ServerMessage };
export { parseServerMessage };

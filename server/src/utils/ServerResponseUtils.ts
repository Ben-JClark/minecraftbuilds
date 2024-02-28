export type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

export function makeErrRes(code: number, feild: string | undefined, message: string): ServerResponse {
  return { success: false, statusCode: code, invalidFeild: feild, errorMessage: message };
}

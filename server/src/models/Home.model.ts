import type { PoolConnection } from "mysql2/promise";

async function get_description(connection: PoolConnection, serverId: number): Promise<string> {
  const [MySQLResponse]: any = (await connection.query("CALL get_long_description(?)", [serverId])) as any;
  return MySQLResponse[0][0];
}

export { get_description };

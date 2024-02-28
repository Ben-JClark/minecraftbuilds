import type { PoolConnection } from "mysql2/promise";

async function get_servers(connection: PoolConnection) {
  const [MySQLResponse]: any = await connection.query("CALL get_servers()");
  return MySQLResponse[0];
}

export { get_servers };

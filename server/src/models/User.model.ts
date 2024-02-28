import type { PoolConnection } from "mysql2/promise";

async function create_user(connection: PoolConnection, username: string, email: string, salt: Buffer, hash: Buffer) {
  await connection.query("CALL create_user(?, ?, ?, ?)", [username, email, salt, hash]);
}

async function email_exists(connection: PoolConnection, email: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL email_exists(?)", [email])) as any;
  return Boolean(MySQLResponse[0][0].result);
}

async function username_exists(connection: PoolConnection, username: string): Promise<Boolean> {
  const [MySQLResponse] = (await connection.query("CALL username_exists(?)", [username])) as any;
  return Boolean(MySQLResponse[0][0].result);
}

export { create_user, email_exists, username_exists };

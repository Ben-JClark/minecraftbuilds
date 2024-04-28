# Minecraft Builds

A website for Minecraft gamers to create accounts, join Minecraft Servers, and post their builds for others to like and comment on.

## Frontend stack

- React
- TypeScript
- CSS

## Frontend libraries

- react-router-dom: Bindings for using React Router
- axios: Promise-based HTTP client

## Backend stack

- Node
- Express
- TypeScript
- MySQL

## Backend libraries and modules

- mysql2: enables interaction with MySQL databases
- express-session: Session middleware
- crypto: Node module providing cryptographic functionality
- morgan: logger middleware
- cors: express middleware to enable CORS

# API endpoints

## Authentication endpoints

Create an account

```
POST /auth/signup
```

Sign in (Create a session)

```
POST /auth/signin
```

Sign out (Delete a session)

```
DELETE /auth/signout
```

## Other endpoints

Get a list of Minecraft servers

```
GET /servers/
```

Get the description of a server

```
GET /servers/{serverId}/home
```

Get a list of Minecraft bases

```
GET /servers/{serverId}/bases
```

Create a Minecraft base

```
POST /servers/{serverId}/bases
```

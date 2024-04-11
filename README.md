# minecraftbuilds

A website for Minecraft gamers to create accounts, join Minecraft Servers, and post their builds for others to like and comment on.

## Frontend stack
- React
- TypeScript
- CSS

## Backend stack
- Node
- Express
- TypeScript
- MySQL

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
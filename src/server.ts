import { server } from "@hapi/hapi";
import { defineRoutes } from "./routes";
import { Environment } from "./environment";

const environment = new Environment();

const port = environment.getPort();
const host = environment.getHost();

const getServer = () => {
    const hapiServer = server({
        host,
        port,
    });

    defineRoutes(hapiServer);

    return hapiServer;
};

export const initializeServer = async () => {
    const server = getServer();
    await server.initialize();
    return server;
};

export const startServer = async () => {
    const server = getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};

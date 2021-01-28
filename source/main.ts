import { FastifyInstance, fastify } from "fastify";

const server: FastifyInstance = fastify({ logger: true, trustProxy: true });
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

server.route({
  method: "GET",
  url: "/**",
  handler: (request): Promise<string> => {
    server.log.info(
      "Cloud Run で 実行しているか: " + IS_GOOGLE_CLOUD_RUN.toString()
    );
    return Promise.resolve(request.url + "としてリクエストされた");
  },
});

const port =
  process.env.PORT === undefined ? 8080 : Number.parseInt(process.env.PORT, 10);

const address = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined;
server.listen(port, address);

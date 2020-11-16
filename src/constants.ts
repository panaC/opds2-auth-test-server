import { env } from "process";
import { resolve } from "url";

export const NAME = "OPDS2 authentification test server";

export const PORT = env.PORT || 8080;

export const SELF_SERVER_URL = env.SERVER_URL || "http://localhost:8282/";

export const STATIC_SERVER_URL = env.STATIC_URL || "http://localhost:8080/";

export const IS_CLOUD_DOCKER = env.IS_CLOUD_DOCKER === "true" || false;

// https://docs.docker.com/docker-for-mac/networking/
export const STATIC_SERVER_URL_IN_DOCKER = "http://host.docker.internal:8080/";

// access host localhost inside container without docker network
export const STATIC_SERVER_URL_IN_STREAMER = IS_CLOUD_DOCKER ? STATIC_SERVER_URL : STATIC_SERVER_URL_IN_DOCKER;

const _STREAMER_SERVER_URL = env.STREAMER_URL || "http://localhost:8181/";
export const STREAMER_SERVER_URL = resolve(_STREAMER_SERVER_URL, "/pub/"); 

export const jwtConstants = {
    secret: 'secretKey',
  };
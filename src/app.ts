import fastify from "fastify";
import {z, ZodError} from "zod";
import { prisma } from "./lib/prisma";
import type { Prisma } from "@prisma/client";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";



export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((e, request, reply) => {
  if(e instanceof ZodError) {
    return reply.status(400)
    .send({message: 'Validation error.', issues: e.format()})
  }

  if(env.NODE_ENV != 'production' ){
    console.error(e)
  }
  return reply.status(500).send({message: 'Internal server error.'})
})




import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import {TypeBoxValidatorCompiler, type TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {Value} from '@sinclair/typebox/value';
import fastifyFactory from 'fastify';
import {composite, createUserResponseLiteral, getUserResponseLiteral} from 'types/out/dataTypes/user.js';

export const init = async () => {
	const fastify = fastifyFactory()
		.withTypeProvider<TypeBoxTypeProvider>()
		.setValidatorCompiler(TypeBoxValidatorCompiler);

	await fastify.register(fastifyCors, {
		origin: true,
	});

	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'Test swagger',
				description: 'Testing the Fastify swagger API',
				version: '0.1.0',
			},
			host: 'localhost:8000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		},
	});
	await fastify.register(fastifySwaggerUi, {
		routePrefix: '/',
		uiConfig: {
			deepLinking: false,
		},
		transformSpecificationClone: true,
	});

	fastify.route({
		url: '/user',
		method: 'GET',
		schema: {
			response: getUserResponseLiteral,
		},
		async handler() {
			return {
				code: 'QUERIED_USER' as const,
				payload: Value.Create(composite),
			};
		},
	});

	fastify.route({
		url: '/user',
		method: 'POST',
		schema: {
			body: composite,
			response: createUserResponseLiteral,
		},
		async handler() {
			return {
				code: 'USER_CREATED' as const,
				payload: null,
			};
		},
	});

	fastify.swagger();

	return fastify;
};

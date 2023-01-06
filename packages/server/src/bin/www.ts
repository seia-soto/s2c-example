import {init} from '../index.js';

(async () => {
	const fastify = await init();

	await fastify.ready();

	const addr = await fastify.listen({
		port: 8000,
	});

	console.log(addr);
})();

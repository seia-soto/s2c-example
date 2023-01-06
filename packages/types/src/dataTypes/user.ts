/* eslint-disable @typescript-eslint/naming-convention */
import {Type, type Static} from '@sinclair/typebox';
import {createApiResponseType, emptyType, type ApiSpecification, type Empty} from '../api.js';

// Dynamic variables
export const name = Type.String({
	description: 'The name of user.',
	default: 'I',
});

// Preserved section
export const composite = Type.Object({
	name,
});

export type User = Static<typeof composite>;

// ${method}${schemaName}ResponseLiteral is for server-side JSON schema validating.
export const getUserResponseLiteral = {
	200: createApiResponseType(Type.Literal('QUERIED_USER'), composite),
};

// ${method}${schemaName}ResponseType is for browser-side schema validating.
export const getUserResponseType = Type.Object(getUserResponseLiteral);

export const createUserResponseLiteral = {
	200: createApiResponseType(Type.Literal('USER_CREATED'), emptyType),
};

export const createUserResponseType = Type.Object(createUserResponseLiteral);

export type UserMethods = {
	// Inline commenting is not preserved by TypeScript on VS Code yet.
	'GET /user': ApiSpecification<Empty, Static<typeof getUserResponseType>>;
	'POST /user': ApiSpecification<User, Static<typeof createUserResponseType>>;
};

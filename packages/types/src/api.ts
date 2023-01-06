import {type TLiteral, Type, type Static, type TSchema} from '@sinclair/typebox';

export const emptyType = Type.Null();

export type Empty = Static<typeof emptyType>;

export const createApiResponseType = <Code extends TLiteral, Payload extends TSchema>(codeType: Code, payloadType: Payload) => Type.Object({
	code: codeType,
	payload: payloadType,
});

export type ApiResponse<Payload = Empty> = Record<number, {
	code: string;
	payload?: Payload;
}>;

export type ApiSpecification<
	RequestBody = Empty,
	ResponsePayload extends ApiResponse<unknown> = ApiResponse,
> = {
	request: {
		uri: string;
		body: RequestBody;
	};
	response: ResponsePayload;
};

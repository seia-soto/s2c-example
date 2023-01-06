import {type UserMethods} from 'types/out/dataTypes/user.js';
import {createInterfaceByDataType} from './api.js';

export type CompositedDataTypes = UserMethods;

/**
 * Create fetcher instance.
 * @example const fetcher = createFetcher();
 * const response = await fetcher('GET /user');
 */
export const createFetcher = (prefix = 'https://api.local') => createInterfaceByDataType<CompositedDataTypes>(prefix);

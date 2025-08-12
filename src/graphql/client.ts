import { createClient, fetchExchange } from '@urql/core';

export const client = createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
    exchanges: [fetchExchange]
});

import { QueryClient } from "@tanstack/react-query";

export const QUERY_CLIENT = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
		},
		mutations: {
			retry: 3,
		},
	},
});

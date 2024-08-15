import { QueryClient } from "@tanstack/react-query";

export interface OnMutateOptimisticRollBackProps<T> {
	queryKey: string[];
	queryClient: QueryClient;
	previousQueryData?: T[];
}

export const onMutateOptimisticRollBack = <T>({
	queryClient,
	queryKey,
	previousQueryData,
}: OnMutateOptimisticRollBackProps<T>) => {
	queryClient.setQueryData(queryKey, previousQueryData);
};

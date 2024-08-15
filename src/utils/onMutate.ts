import { QueryClient, QueryKey } from "@tanstack/react-query";

export interface OnMutateOptimisticProps<T> {
	queryKey: QueryKey;
	newData: T;
	queryClient: QueryClient;
}
export interface OnMutateOptimisticResponse<T> {
	previousQueryData: T[];
}

export const onMutateOptimistic = async <T>({
	queryKey,
	newData,
	queryClient,
}: OnMutateOptimisticProps<T>): Promise<OnMutateOptimisticResponse<T>> => {
	await queryClient.cancelQueries({ queryKey });

	const previousQueryData = queryClient.getQueryData<T[]>(queryKey) || [];

	queryClient.setQueryData(queryKey, (oldData: T[]) => [
		...oldData,
		{
			...newData,
			id: "temporary-id",
		},
	]);

	return { previousQueryData };
};

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

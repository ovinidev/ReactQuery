import { User } from "@/interface/users";
import { CreateUserRequest, createUser } from "@api/users";
import { USERS } from "@constants/queryKeys";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { onMutateOptimistic } from "@utils/onMutateOptimistic";
import { onMutateOptimisticRollBack } from "@utils/onMutateOptimisticRollBack";

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: CreateUserRequest) => await createUser(data),
		onMutate: async (newUser: User) =>
			await onMutateOptimistic<User>({
				newData: newUser,
				queryKey: [USERS],
				queryClient,
			}),
		onError: (_err, _variables, context) =>
			onMutateOptimisticRollBack({
				queryClient,
				queryKey: [USERS],
				previousQueryData: context?.previousQueryData,
			}),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [USERS] });
		},
	});

	return {
		createUser: mutateAsync,
		isPending,
	};
};

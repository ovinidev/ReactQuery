import { User } from "@/interface/users";
import { CreateUserRequest, createUser } from "@api/users";
import { USERS } from "@constants/queryKeys";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useId } from "react";

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	const id = useId();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: CreateUserRequest) => await createUser(data),
		onMutate: async (newUser) => {
			await queryClient.cancelQueries({ queryKey: [USERS] });

			const previousUsers = queryClient.getQueryData([USERS]) as User[];

			queryClient.setQueryData([USERS], (old: User[]) => [
				...old,
				{
					...newUser,
					id,
				},
			]);

			return { previousUsers };
		},
		onError: (
			_err,
			_variables,
			context: { previousUsers: User[] } | undefined,
		) => {
			queryClient.setQueryData([USERS], context?.previousUsers);
		},
		// onSettled = like finally
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [USERS] });
		},
	});

	return {
		createUser: mutateAsync,
		isPending,
	};
};

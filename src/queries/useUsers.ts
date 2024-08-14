import { getUsers } from "@api/users";
import { USERS } from "@constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: [USERS],
		queryFn: getUsers,
		refetchOnWindowFocus: true,
		staleTime: 1000 * 60 * 5, // Os dados ficarão obsoletos depois de 5 minutos
		gcTime: 5000, // Depois de 5 segundos que o cache ficar inativo ele irá remover essa query do cache
		refetchInterval: 1000 * 60 * 10, // Fará requisições a cada 10 minutos
	});

	return {
		users: data ? data : [],
		isLoading,
		error,
	};
};

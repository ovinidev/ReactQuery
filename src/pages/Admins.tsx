import { getUsers } from "@api/users";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function Admins() {
	const queryClient = useQueryClient();

	const prefetchUsers = () => {
		queryClient.prefetchQuery({
			queryKey: ["users"],
			queryFn: getUsers,
		});
	};

	return (
		<div className="flex h-screen items-center justify-center bg-slate-800">
			<Link onMouseEnter={prefetchUsers} to="/">
				Users
			</Link>
		</div>
	);
}

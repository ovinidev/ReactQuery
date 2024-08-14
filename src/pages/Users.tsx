import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useCreateUser } from "@mutations/useCreateUser";
import { useUsers } from "@queries/useUsers";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

export function Users() {
	const { users, isLoading, error } = useUsers();

	const { createUser, isPending } = useCreateUser();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const elements = event.currentTarget
			.elements as typeof event.currentTarget.elements & {
			email: HTMLInputElement;
			name: HTMLInputElement;
		};

		await createUser({
			email: elements.email.value,
			name: elements.name.value,
		});

		elements.email.value = "";
		elements.name.value = "";
	};

	return (
		<div className="flex h-screen flex-col bg-slate-800 p-4">
			{isLoading && <span>Carregando</span>}
			<Link to="admins">Admin</Link>

			<form
				className="mt-8 flex flex-col items-start gap-2"
				onSubmit={handleSubmit}
			>
				<Input name="name" label="Nome" className="w-56" />
				<Input name="email" label="Email" className="w-56" />
				<Button disabled={isPending} variant="secondary">
					Cadastrar
				</Button>
			</form>

			{isPending && <span>Cadastrando</span>}

			<div className="mt-8 flex flex-col gap-2">
				{users.map((user) => {
					return (
						<span
							className={`${isPending ? "last:text-slate-400" : "text-slate-50"}`}
							key={user.id}
						>
							{user.email}
						</span>
					);
				})}
			</div>

			{error && <b>Deu erro</b>}
		</div>
	);
}

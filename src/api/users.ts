import { User } from "@/interface/users";
import { USERS } from "@constants/queryKeys";
import { sleep } from "@utils/sleep";
import axios from "axios";

const AXIOS_INSTANCE = axios.create({
	baseURL: "http://localhost:3000",
});

export const getUsers = async () => {
	await sleep();

	const { data } = await AXIOS_INSTANCE.get<User[]>(USERS);

	return data;
};

export interface CreateUserRequest {
	name: string;
	email: string;
}

export const createUser = async (body: CreateUserRequest) => {
	await sleep(2000);

	const { data } = await AXIOS_INSTANCE.post(USERS, body);

	return data;
};

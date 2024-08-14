import { Admins } from "@pages/Admins";
import { Users } from "@pages/Users";
import { Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Users />} />
			<Route path="/admins" element={<Admins />} />
		</Routes>
	);
}

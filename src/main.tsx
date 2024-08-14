import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import "@styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { QUERY_CLIENT } from "@services/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={QUERY_CLIENT}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
);

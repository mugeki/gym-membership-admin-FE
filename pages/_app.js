import "../styles/Globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Custom.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { parseCookies } from "nookies";
import { redirect } from "../utils/helper";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { token } = parseCookies(ctx);

	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const isProtectedRoute =
		ctx.pathname !== "/login" && ctx.pathname !== "/register";

	if (!token && isProtectedRoute) {
		redirect(ctx, "/login");
	}

	if (token && !isProtectedRoute) {
		redirect(ctx, "/");
	}

	return { pageProps };
};

export default MyApp;

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { storeAdmin } from "../store/adminSlice";
import Cookies from "universal-cookie";
import { Base64 } from "js-base64";

export default function useHandleLogin() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogin = async (res) => {
		let adminData = {
			...res,
		};
		delete adminData.token;
		const hash = Base64.encode(res.token);
		cookies.set("token", hash, { path: "/", domain: window.location.hostname });
		dispatch(storeAdmin(adminData));

		if (adminData.is_super_admin) {
			router.push("/admins");
		} else {
			router.push("/transactions");
		}
	};
	return handleLogin;
}

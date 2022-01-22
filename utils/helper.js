import { Base64 } from "js-base64";
import Router from "next/router";
import Cookies from "universal-cookie";

function redirect(ctx, location) {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
}

function handleUnauthorized(res) {
	if ([401, 403].includes(res?.status)) {
		const cookies = new Cookies();
		cookies.remove("token", { path: "/", domain: window.location.hostname });
		Router.push("/login");
	}
}

function handleLowerCase(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleDate(date) {
	const formattedDate = new Date(date);
	return formattedDate.toLocaleDateString("en-GB");
}

function generateAxiosConfig() {
	const cookies = new Cookies();
	const token = Base64.decode(cookies.get("token"));
	const config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};
	return config;
}

function removeElement(array, item) {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
}

export {
	handleUnauthorized,
	redirect,
	handleLowerCase,
	handleDate,
	generateAxiosConfig,
	removeElement,
};

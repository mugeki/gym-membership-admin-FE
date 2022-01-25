import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { container } from "../../styles/Login.module.css";
import axios from "axios";
import useValidateForm from "../../hooks/useValidateForm";
import useHandleLogin from "../../hooks/useHandleLogin";
import Head from "next/head";

export default function Login() {
	const handleLogin = useHandleLogin();
	const { validateForm } = useValidateForm();
	const [errorMsg, setErrorMsg] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
	};
	const onBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const messages = validateForm(name, value);
		setErrorMsg({ ...errorMsg, ...messages });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (Object.keys(newErrors).length > 0) {
			setErrorMsg(newErrors);
		} else {
			// const API_URL = process.env.BE_API_URL;
			const API_URL = process.env.BE_API_URL;
			axios
				.post(`${API_URL}/admins/login`, {
					...form,
				})
				.then((res) => {
					handleLogin(res.data.data);
				})
				.catch((error) => {
					setErrorMsg({
						...errorMsg,
						auth: error.response.data.meta.messages[0],
					});
				});
		}
	};

	return (
		<div
			className={`${container} box d-flex flex-column border rounded px-4 py-5 position-absolute top-50 start-50 translate-middle`}
		>
			<Head>
				<title>Login | Alta2Gym Admin Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h4 className="fw-bolder text-center text-primary mb-4">Admin Login</h4>
			<Form className="px-4" noValidate onSubmit={onSubmit}>
				<p className="text-danger text-center">{errorMsg.auth}</p>
				<Form.Floating className="mb-3">
					<Form.Control
						id="username"
						type="text"
						placeholder="Username"
						name="username"
						value={form.username}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.username}
					/>
					<label htmlFor="username">Username</label>
					<Form.Control.Feedback type="invalid">
						{errorMsg.username}
					</Form.Control.Feedback>
				</Form.Floating>
				<Form.Floating className="mb-3">
					<Form.Control
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						name="password"
						value={form.password}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.password}
					/>
					<label htmlFor="password">Password</label>
					<Form.Control.Feedback type="invalid">
						{errorMsg.password}
					</Form.Control.Feedback>
				</Form.Floating>
				<Form.Check
					type="checkbox"
					label="Show password"
					onClick={() => setShowPassword(!showPassword)}
				/>
				<Button variant="primary w-100 my-4 py-2" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}

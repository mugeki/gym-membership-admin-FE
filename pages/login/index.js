import { Button, Form } from "react-bootstrap";
import { container } from "../../styles/Login.module.css";

export default function Login() {
	return (
		<div
			className={`${container} box d-flex flex-column border rounded px-4 py-5 position-absolute top-50 start-50 translate-middle`}
		>
			<h4 className="fw-bolder text-center text-primary mb-4">Admin Login</h4>
			<Form className="px-4">
				<Form.Floating className="mb-3">
					<Form.Control
						id="floatingInputCustom"
						type="email"
						placeholder="name@example.com"
					/>
					<label htmlFor="floatingInputCustom">Email address</label>
				</Form.Floating>
				<Form.Floating className="mb-3">
					<Form.Control
						id="floatingPasswordCustom"
						type="password"
						placeholder="Password"
					/>
					<label htmlFor="floatingPasswordCustom">Password</label>
				</Form.Floating>
				<Button variant="primary w-100 my-4 py-2">Login</Button>
			</Form>
		</div>
	);
}

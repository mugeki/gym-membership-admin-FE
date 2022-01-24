import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import useValidateForm from "../../hooks/useValidateForm";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import FileUpload from "./FileUpload";

export default function AdminFormModal({
	entries,
	data,
	action,
	show,
	onHide,
	onStateChange,
}) {
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
		fullname: "",
		gender: "male",
		telephone: "",
		address: "",
		url_image: "",
		is_super_admin: false,
	});
	useEffect(() => {
		data && setForm(data);
	}, [data]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const { validateForm } = useValidateForm();

	const onHideModal = () => {
		setForm({
			username: "",
			password: "",
			email: "",
			fullname: "",
			gender: "male",
			telephone: "",
			address: "",
			url_image: "",
			is_super_admin: false,
		});
		setError({});
		onHide();
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name !== "is_super_admin") {
			setForm({ ...form, [name]: value });
		} else {
			setForm({ ...form, [name]: !form.is_super_admin });
		}
	};

	const onBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const messages = validateForm(name, value);
		setError({ ...error, ...messages });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (action === "edit" && form.password === "") {
			delete newErrors.password;
		}
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
		} else {
			const formData = { ...form };
			delete formData.id;
			delete formData.index;
			if (formData.url_image === "") {
				formData.url_image = process.env.DEFAULT_PROFILE;
			}
			const API_URL = process.env.BE_API_URL_LOCAL;
			if (action === "add") {
				axios
					.post(
						`${API_URL}/admins`,
						{
							...formData,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData.unshift(res.data.data);
						if (newData.length === 10) {
							newData.pop();
						}
						onStateChange({ data: newData });
						toast.success("Admin added", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					})
					.catch((error) => {
						handleUnauthorized(error.response);
						console.log(error);
					});
			} else {
				axios
					.put(
						`${API_URL}/admins/${data.id}`,
						{
							...formData,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("Admin updated", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					})
					.catch((error) => {
						handleUnauthorized(error.response);
						console.log(error);
					});
			}
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHideModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			scrollable
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-5">
				<Form noValidate onSubmit={onSubmit}>
					<FloatingLabel className="mb-3" label="Username">
						<Form.Control
							type="text"
							placeholder=" "
							name="username"
							value={form.username}
							onChange={onChange}
							onBlur={onBlur}
							isInvalid={!!error.username}
						/>
						<Form.Control.Feedback type="invalid">
							{error.username}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Password">
						<Form.Control
							type="password"
							placeholder=" "
							name="password"
							value={form.password}
							onChange={onChange}
							onBlur={onBlur}
							isInvalid={!!error.password}
						/>
						<Form.Control.Feedback type="invalid">
							{error.password}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Email">
						<Form.Control
							type="email"
							placeholder=" "
							name="email"
							value={form.email}
							onChange={onChange}
							onBlur={onBlur}
							isInvalid={!!error.email}
						/>
						<Form.Control.Feedback type="invalid">
							{error.email}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Name">
						<Form.Control
							type="text"
							placeholder=" "
							name="fullname"
							value={form.fullname}
							onChange={onChange}
							onBlur={onBlur}
							isInvalid={!!error.fullname}
						/>
						<Form.Control.Feedback type="invalid">
							{error.fullname}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Gender">
						<Form.Select
							placeholder=" "
							name="gender"
							value={form.gender}
							onChange={onChange}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Phone Number">
						<Form.Control
							type="tel"
							placeholder=" "
							name="telephone"
							value={form.telephone}
							onChange={onChange}
							onBlur={onBlur}
							isInvalid={!!error.telephone}
						/>
						<Form.Control.Feedback type="invalid">
							{error.telephone}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Address">
						<Form.Control
							type="text"
							placeholder=" "
							name="address"
							value={form.address}
							onChange={onChange}
							isInvalid={!!error.address}
						/>
						<Form.Control.Feedback type="invalid">
							{error.address}
						</Form.Control.Feedback>
					</FloatingLabel>

					<Form.Check
						type="checkbox"
						name="is_super_admin"
						className="mb-3"
						label="Super Admin"
						value={form.is_super_admin}
						checked={form.is_super_admin}
						onChange={onChange}
					/>

					<FileUpload
						image={form.url_image}
						setImageSrc={(value) => {
							setForm((state) => {
								return { ...state, url_image: value };
							});
						}}
						loading={loading}
						setLoading={(value) => {
							setLoading(value);
						}}
					/>
					<Button variant="primary w-100 mt-3" type="submit" disabled={loading}>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

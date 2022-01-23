import axios from "axios";
import { useEffect, useState } from "react";
import {
	Form,
	Button,
	Modal,
	FloatingLabel,
	InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import useValidateForm from "../../hooks/useValidateForm";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import FileUpload from "./FileUpload";

export default function MembershipFormModal({
	entries,
	data,
	action,
	show,
	onHide,
	onStateChange,
}) {
	const [form, setForm] = useState({
		name: "",
		price: "",
		period_time: "",
		url_image: "",
	});
	useEffect(() => {
		data && setForm(data);
	}, [data]);

	const [error, setError] = useState({});
	const { validateForm } = useValidateForm();

	const onHideModal = () => {
		setForm({
			name: "",
			price: "",
			period_time: "",
			url_image: "",
		});
		setError({});
		onHide();
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
		} else {
			const formData = { ...form };
			delete formData.id;
			delete formData.index;
			formData.price = parseInt(formData.price);
			formData.period_time = parseInt(formData.period_time);
			if (formData.url_image === "") {
				formData.url_image = process.env.DEFAULT_THUMB;
			}
			const API_URL = process.env.BE_API_URL_LOCAL;
			if (action === "add") {
				axios
					.post(
						`${API_URL}/membership-products`,
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
						toast.success("Membership product added", {
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
						`${API_URL}/membership-products/${data.id}`,
						{
							...formData,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("Membership product updated", {
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
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-5">
				<Form noValidate onSubmit={onSubmit}>
					<FloatingLabel className="mb-3" label="Name">
						<Form.Control
							type="text"
							placeholder=" "
							name="name"
							value={form.name}
							onChange={onChange}
							isInvalid={!!error.name}
						/>
						<Form.Control.Feedback type="invalid">
							{error.name}
						</Form.Control.Feedback>
					</FloatingLabel>

					<InputGroup className="mb-3">
						<InputGroup.Text>Rp</InputGroup.Text>
						<Form.Control
							type="number"
							placeholder="Price"
							min={0}
							name="price"
							value={form.price}
							onChange={onChange}
							isInvalid={!!error.price}
						/>
						<Form.Control.Feedback type="invalid">
							{error.price}
						</Form.Control.Feedback>
					</InputGroup>

					<InputGroup className="mb-3">
						<Form.Control
							type="number"
							placeholder="Period"
							min={0}
							name="period_time"
							value={form.period_time}
							onChange={onChange}
							isInvalid={!!error.period_time}
						/>
						<InputGroup.Text>Days</InputGroup.Text>
						<Form.Control.Feedback type="invalid">
							{error.period_time}
						</Form.Control.Feedback>
					</InputGroup>

					<FileUpload
						image={form.url_image}
						setImageSrc={(value) => {
							setForm((state) => {
								return { ...state, url_image: value };
							});
						}}
					/>
					<Button variant="primary w-100 mt-3" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

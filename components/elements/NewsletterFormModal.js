import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useValidateForm from "../../hooks/useValidateForm";
import {
	generateAxiosConfig,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";
import FileUpload from "./FileUpload";

export default function NewsletterFormModal({
	entries,
	data,
	action,
	show,
	onHide,
	onStateChange,
}) {
	const admin = useSelector((state) => state.admin);
	const [form, setForm] = useState({
		title: "",
		classification_id: "",
		url_image: "",
		text: "",
		member_only: false,
		admin_id: admin.id,
	});
	useEffect(() => {
		data && setForm(data);
	}, [data]);

	const [dropdown, setDropdown] = useState();
	const [error, setError] = useState({});
	const { validateForm } = useValidateForm();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(`${API_URL}/classification`, generateAxiosConfig())
			.then((res) => {
				const classifications = [];
				for (const item of res.data.data) {
					classifications.push(item);
				}
				setForm((state) => {
					return {
						...state,
						classification_id: classifications[0].id,
					};
				});
				setDropdown(classifications);
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setForm]);

	const onHideModal = () => {
		setForm({
			title: "",
			classification_id: "",
			url_image: "",
			text: "",
			member_only: false,
			admin_id: admin.id,
		});
		setError({});
		onHide();
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name !== "member_only") {
			setForm({ ...form, [name]: value });
		} else {
			setForm({ ...form, [name]: !form.member_only });
		}
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
			if (formData.url_image === "") {
				formData.url_image = process.env.DEFAULT_THUMB;
			}
			const API_URL = process.env.BE_API_URL_LOCAL;
			if (action === "add") {
				axios
					.post(
						`${API_URL}/articles`,
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
						toast.success("Newsletter added", {
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
						`${API_URL}/articles/${data.id}`,
						{
							...formData,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("Newsletter updated", {
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
					<FloatingLabel className="mb-3" label="Title">
						<Form.Control
							type="text"
							placeholder=" "
							name="title"
							value={form.title}
							onChange={onChange}
							isInvalid={!!error.title}
						/>
						<Form.Control.Feedback type="invalid">
							{error.title}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Classification">
						<Form.Select
							type="text"
							placeholder=" "
							name="title"
							value={form.classification_id}
							onChange={onChange}
						>
							{dropdown?.map((item, i) => (
								<option key={i} value={item.id}>
									{handleLowerCase(item.name)}
								</option>
							))}
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel className="mb-3" label="Text">
						<Form.Control
							as="textarea"
							placeholder=" "
							name="text"
							value={form.text}
							onChange={onChange}
							isInvalid={!!error.text}
						/>
						<Form.Control.Feedback type="invalid">
							{error.text}
						</Form.Control.Feedback>
					</FloatingLabel>
					<Form.Check
						type="checkbox"
						name="member_only"
						className="mb-3"
						label="Member Only"
						value={form.member_only}
						checked={form.member_only}
						onChange={onChange}
					/>
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

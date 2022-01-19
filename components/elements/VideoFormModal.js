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

export default function VideoFormModal({
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
		url: "",
		member_only: false,
		admin_id: admin.id,
	});

	useEffect(() => {
		if (data) {
			setForm(data);
			delete form.id;
			delete form.index;
		}
	}, [data, form.id, form.index]);

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
			const API_URL = process.env.BE_API_URL_LOCAL;
			if (action === "add") {
				console.log("form", form);
				axios
					.post(
						`${API_URL}/videos`,
						{
							...form,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData.unshift(res.data.data);
						newData.pop();
						onStateChange({ data: newData });
						toast.success("Video added", {
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
						console.log(error.response);
						handleUnauthorized(error.response);
						console.log(error);
					});
			} else {
				axios
					.put(
						`${API_URL}/videos/${data.id}`,
						{
							...form,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("Video updated", {
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
			onHide={onHide}
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
						<Form.Control.Feedback type="invalid">
							{error.title}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Video URL">
						<Form.Control
							type="text"
							placeholder=" "
							name="url"
							value={form.url}
							onChange={onChange}
							isInvalid={!!error.url}
						/>
						<Form.Control.Feedback type="invalid">
							{error.title}
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

					<Button variant="primary w-100 mt-3" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import useValidateForm from "../../hooks/useValidateForm";
import {
	generateAxiosConfig,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";

export default function AddVideoModal(props) {
	const admin = useSelector((state) => state.admin);
	const [form, setForm] = useState({
		title: "",
		classification_id: "",
		url: "",
		member_only: false,
		admin_id: admin.id,
	});
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
		setForm({ ...form, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
		} else {
			const API_URL = process.env.BE_API_URL_LOCAL;
			axios
				.post(
					`${API_URL}/videos`,
					{
						...form,
					},
					generateAxiosConfig()
				)
				.catch((error) => {
					handleUnauthorized(error.response);
					console.log(error);
				});
		}
	};

	useEffect(() => {
		console.log(form);
	}, [form]);

	return (
		<Modal
			{...props}
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
							value={form.classification}
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
						className="mb-3"
						label="Member Only"
						value={form.member_only}
						onClick={() => {
							setForm((state) => {
								return { ...state, member_only: !state.member_only };
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

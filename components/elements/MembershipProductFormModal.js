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

export default function MembershipProductFormModal({
	entries,
	data,
	action,
	show,
	onHide,
	onStateChange,
}) {
	const admin = useSelector((state) => state.admin);
	const [form, setForm] = useState({
		product: "",
		classification_id: "",
		url: "",
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
			.get(`${API_URL}/membership-product`, generateAxiosConfig())
			.then((res) => {
				const MembershipProducts = [];
				for (const item of res.data.data) {
					MembershipProducts.push(item);
				}
				setForm((state) => {
					return {
						...state,
						MembershipProducts_id: MembershipProducts[0].id,
					};
				});
				setDropdown(MembershipProducts);
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setForm]);

	const onHideModal = () => {
		setForm({
			product: "",
			classification_id: "",
			url: "",
			member_only: false,
			admin_id: admin.id,
		});
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
			const API_URL = process.env.BE_API_URL_LOCAL;
			if (action === "add") {
				axios
					.post(
						`${API_URL}/membership-products`,
						{
							...form,
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
						toast.success("MembershipProducts added", {
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
							...form,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("MembershipProduct updated", {
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
			aria-labelledby="contained-modal-product-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-5">
				<Form noValidate onSubmit={onSubmit}>
					<FloatingLabel className="mb-3" label="Product">
						<Form.Control
							type="text"
							placeholder=" "
							name="product"
							value={form.product}
							onChange={onChange}
							isInvalid={!!error.product}
						/>
						<Form.Control.Feedback type="invalid">
							{error.product}
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

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
import useHandleDate from "../../hooks/useHandleDate";
import useValidateForm from "../../hooks/useValidateForm";
import {
	checkNestedEmpty,
	generateAxiosConfig,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";
import DateForm from "./DateForm";
import DateList from "./DateList";
import FileUpload from "./FileUpload";

export default function ClassFormModal({
	entries,
	data,
	action,
	show,
	onHide,
	onStateChange,
}) {
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		kuota: "",
		location: "",
		date: [{ day: "", time_start: "", time_end: "" }],
		weeks: "",
		is_online: false,
		available_status: false,
		trainer_id: "",
		url_image: "",
	});
	useEffect(() => {
		data && setForm(data);
	}, [data]);

	const [loading, setLoading] = useState(false);
	const [dropdown, setDropdown] = useState();
	const [error, setError] = useState({});
	const { validateForm, validateDateForm } = useValidateForm();
	const { newDateList } = useHandleDate();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/trainers`, generateAxiosConfig())
			.then((res) => {
				const trainers = [];
				for (const item of res.data.data) {
					trainers.push(item);
				}
				setForm((state) => {
					return {
						...state,
						trainer_id: trainers[0].id,
					};
				});
				setDropdown(trainers);
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setForm]);

	const onHideModal = () => {
		setForm({
			name: "",
			description: "",
			price: "",
			kuota: "",
			location: "",
			date: [{ day: "", time_start: "", time_end: "" }],
			weeks: "",
			is_online: false,
			available_status: false,
			trainer_id: "",
			url_image: "",
		});
		setError({});
		onHide();
	};

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === "is_online") {
			setForm({ ...form, [name]: !form.is_online });
		} else if (name === "available_status") {
			setForm({ ...form, [name]: !form.available_status });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = {
			...validateForm(undefined, undefined, form),
			...validateDateForm(form.date),
		};
		for (const key in newErrors) {
			if (
				key.includes("date") &&
				checkNestedEmpty(newErrors[key], "day") &&
				checkNestedEmpty(newErrors[key], "time_start") &&
				checkNestedEmpty(newErrors[key], "time_end")
			) {
				delete newErrors[key];
			}
		}
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
		} else {
			const formData = { ...form };
			delete formData.id;
			delete formData.index;
			formData.price = parseInt(formData.price);
			formData.kuota = parseInt(formData.kuota);
			formData.trainer_id = parseInt(formData.trainer_id);
			if (formData.url_image === "") {
				formData.url_image = process.env.DEFAULT_THUMB;
			}
			const API_URL = process.env.BE_API_URL;
			if (action === "add") {
				formData.date = newDateList(formData.date, formData.weeks);
				delete formData.weeks;
				axios
					.post(
						`${API_URL}/classes`,
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
						toast.success("Class added", {
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
						`${API_URL}/classes/${data.id}`,
						{
							...formData,
						},
						generateAxiosConfig()
					)
					.then((res) => {
						const newData = [...entries];
						newData[data.index] = res.data.data;
						onStateChange({ data: newData });
						toast.success("Class updated", {
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
			scrollable={true}
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

					<FloatingLabel className="mb-3" label="Description">
						<Form.Control
							as="textarea"
							placeholder=" "
							name="description"
							value={form.description}
							onChange={onChange}
							isInvalid={!!error.description}
						/>
						<Form.Control.Feedback type="invalid">
							{error.description}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Trainer">
						<Form.Select
							type="text"
							placeholder=" "
							name="trainer_id"
							value={form.trainer_id}
							onChange={onChange}
						>
							{dropdown?.map((item, i) => (
								<option key={i} value={item.id}>
									{handleLowerCase(item.fullname)}
								</option>
							))}
						</Form.Select>
					</FloatingLabel>

					<Form.Check
						type="checkbox"
						name="is_online"
						className="mb-3"
						label="Online Class"
						value={form.is_online}
						checked={form.is_online}
						onChange={onChange}
					/>

					<FloatingLabel
						className="mb-3"
						label={form.is_online ? "Meeting URL" : "Location"}
					>
						<Form.Control
							type="text"
							placeholder=" "
							name="location"
							value={form.location}
							onChange={onChange}
							isInvalid={!!error.location}
						/>
						<Form.Control.Feedback type="invalid">
							{error.location}
						</Form.Control.Feedback>
					</FloatingLabel>

					<FloatingLabel className="mb-3" label="Quota">
						<Form.Control
							type="number"
							placeholder=" "
							name="kuota"
							value={form.kuota}
							onChange={onChange}
							isInvalid={!!error.kuota}
						/>
						<Form.Control.Feedback type="invalid">
							{error.kuota}
						</Form.Control.Feedback>
					</FloatingLabel>

					<InputGroup className="mb-3">
						<InputGroup.Text>Rp</InputGroup.Text>
						<Form.Control
							type="number"
							placeholder="Price"
							name="price"
							value={form.price}
							onChange={onChange}
							isInvalid={!!error.price}
						/>
						<Form.Control.Feedback type="invalid">
							{error.price}
						</Form.Control.Feedback>
					</InputGroup>

					<Form.Check
						type="checkbox"
						name="available_status"
						className="mb-3"
						label="Available for booking"
						value={form.available_status}
						checked={form.available_status}
						onChange={onChange}
					/>

					{action === "add" && (
						<>
							<DateForm
								error={error}
								setDate={(value) => {
									setForm((state) => {
										return { ...state, date: value };
									});
								}}
							/>
							<InputGroup className="mb-3">
								<InputGroup.Text>Set schedule for</InputGroup.Text>
								<Form.Control
									type="number"
									placeholder="ex: 4"
									name="weeks"
									value={form.weeks}
									onChange={onChange}
									isInvalid={!!error.weeks}
								/>
								<InputGroup.Text>weeks</InputGroup.Text>
								<Form.Control.Feedback type="invalid">
									{error.weeks}
								</Form.Control.Feedback>
							</InputGroup>
						</>
					)}

					{data && (
						<>
							<Form.Label>Schedules</Form.Label>
							<DateList data={data.date} />
						</>
					)}

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

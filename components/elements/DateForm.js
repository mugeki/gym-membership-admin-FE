import { Icon } from "@iconify/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import DateInput from "./DateInput";

export default function DateForm({ error, setDate }) {
	const [schedule, setSchedule] = useState([
		{
			day: "",
			time_start: "",
			time_end: "",
		},
	]);
	const [inputElm, setInputElm] = useState([DateInput]);

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const idx = e.target.id;
		const newData = schedule.map((item, i) =>
			i == idx ? { ...item, [name]: value } : item
		);
		setSchedule(newData);
		setDate(newData);
	};

	const addDate = () => {
		const newData = [...schedule, { day: "", time_start: "", time_end: "" }];
		setSchedule(newData);
		setDate(newData);
		setInputElm((state) => {
			return [...state, DateInput];
		});
	};

	const removeDate = () => {
		const newElm = inputElm.filter((_, i) => i !== inputElm.length - 1);
		setInputElm(newElm);
		const newData = schedule.filter((_, i) => i !== schedule.length - 1);
		setSchedule(newData);
		setDate(newData);
	};

	return (
		<div className="mb-3">
			<Form.Label className="mb-0">Schedules</Form.Label>
			<p className="text-light" style={{ fontSize: "14px" }}>
				Select schedule day(s) in 1 week
			</p>
			{inputElm.map((Component, i) => {
				return (
					<Component
						key={i}
						idx={i}
						data={schedule[i]}
						onStateChange={onChange}
						error={error}
					/>
				);
			})}
			<div className="d-flex">
				{inputElm.length < 7 && (
					<p
						className="my-2 me-3 text-success"
						style={{ cursor: "pointer" }}
						onClick={addDate}
					>
						<Icon icon="akar-icons:circle-plus" className="my-2" /> Add date
					</p>
				)}

				{inputElm.length > 1 && (
					<p
						className="my-2 text-danger"
						style={{ cursor: "pointer" }}
						onClick={removeDate}
					>
						<Icon icon="akar-icons:circle-minus" className="my-2" /> Remove date
					</p>
				)}
			</div>
		</div>
	);
}

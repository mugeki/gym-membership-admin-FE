import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DateInput from "./DateInput";

export default function DateForm({ setDate }) {
	const [schedule, setSchedule] = useState([
		{
			day: "1",
			time_start: "",
			time_end: "",
		},
	]);
	const [inputElm, setInputElm] = useState([]);

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const idx = e.target.id;
		const newData = schedule.map((item, i) =>
			i == idx ? { ...item, [name]: value } : item
		);
		setSchedule(newData);
		setDate(newData);
		// newData.filter((_, i) => i !== schedule.length - 1)
	};

	const addDate = () => {
		const newData = [...schedule, { day: "1", time_start: "", time_end: "" }];
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
			<Form.Label>Schedule</Form.Label>
			{inputElm.map((Component, i) => {
				return (
					<Component
						key={i}
						idx={i}
						data={schedule[i]}
						onStateChange={onChange}
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

				{inputElm.length > 0 && (
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

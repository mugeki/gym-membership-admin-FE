import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function DateInput({ idx, data, onStateChange }) {
	const onChange = (e) => {
		onStateChange(e);
	};
	return (
		<div key={idx} className="border-top border-bottom py-2 mb-4">
			<FloatingLabel className="mb-1" label="Day">
				<Form.Select
					id={idx}
					placeholder=" "
					name="day"
					value={data.day}
					onChange={onChange}
				>
					<option value="1">Monday</option>
					<option value="2">Tuesday</option>
					<option value="3">Wednesday</option>
					<option value="4">Thursday</option>
					<option value="5">Friday</option>
					<option value="6">Saturday</option>
					<option value="0">Sunday</option>
				</Form.Select>
			</FloatingLabel>

			<Row className="g-2">
				<Col>
					<FloatingLabel label="Start Time">
						<Form.Control
							id={idx}
							type="time"
							name="time_start"
							value={data.time_start}
							onChange={onChange}
						/>
					</FloatingLabel>
				</Col>
				<Col>
					<FloatingLabel label="End Time">
						<Form.Control
							id={idx}
							type="time"
							name="time_end"
							min={data.time_start}
							value={data.time_end}
							onChange={onChange}
						/>
					</FloatingLabel>
				</Col>
			</Row>
		</div>
	);
}

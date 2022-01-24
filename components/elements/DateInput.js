import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function DateInput({ idx, data, onStateChange, error }) {
	const onChange = (e) => {
		onStateChange(e);
	};
	return (
		<div key={idx} className="border-top border-bottom py-2 mb-4">
			<FloatingLabel className="mb-1" label="Day">
				<Form.Control
					id={idx}
					type="date"
					name="day"
					value={data.day}
					onChange={onChange}
					isInvalid={!!error[`date_${idx}`]?.day}
				/>
				<Form.Control.Feedback type="invalid">
					{!!error[`date_${idx}`]?.day}
				</Form.Control.Feedback>
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
							isInvalid={!!error[`date_${idx}`]?.time_start}
						/>
						<Form.Control.Feedback type="invalid">
							{!!error[`date_${idx}`]?.time_start}
						</Form.Control.Feedback>
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
							isInvalid={!!error[`date_${idx}`]?.time_end}
						/>
						<Form.Control.Feedback type="invalid">
							{!!error[`date_${idx}`]?.time_end}
						</Form.Control.Feedback>
					</FloatingLabel>
				</Col>
			</Row>
		</div>
	);
}

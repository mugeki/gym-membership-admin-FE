import { useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import useHandleDate from "../../hooks/useHandleDate";

export default function DateList({ data }) {
	const { parseDateList } = useHandleDate();
	const dates = parseDateList(data);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Button className="d-block mb-3" onClick={handleShow}>
				View
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				scrollable
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Schedules
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup variant="flush">
						{dates.map((item, i) => (
							<ListGroupItem key={i}>
								{item.date} {item.hours}
							</ListGroupItem>
						))}
					</ListGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import { Form, Button, Modal } from "react-bootstrap";

export default function AddClassModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="name" placeholder="Enter Name" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicType">
						<Form.Label>Type</Form.Label>
						<Form.Control type="type" placeholder="Type" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicSlot">
						<Form.Label>Slot</Form.Label>
						<Form.Control type="slot" placeholder="Slot" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicTrainer">
						<Form.Label>Trainer</Form.Label>
						<Form.Control type="trainer" placeholder="Trainer" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicLocation">
						<Form.Label>Location</Form.Label>
						<Form.Control type="location" placeholder="Location" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control type="price" placeholder="Price" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicDate">
						<Form.Label>Date</Form.Label>
						<Form.Control type="date" placeholder="Date" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicAttend">
						<Form.Label>Attend</Form.Label>
						<Form.Control type="attend" placeholder="Attend" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicImagee">
						<Form.Label>Image</Form.Label>
						<Form.Control type="file" placeholder="Image" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

import Layout from "../../components/Layout";
import { Form, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import AddClassModal from "../../components/elements/addClassModal";

export default function Classes() {
	const [modalShow, setModalShow] = useState(false);
	// const [editShow, setEditShow] = useState(false);
	// const onClick = () => {
	// 	setEditShow(true);
	// };
	const onClick = () => {
		setModalShow(true);
	};

	return (
		<Layout>
			<AddClassModal show={modalShow} onHide={() => setModalShow(false)} />

			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end">Classes</h1>
				<div className="d-flex p-1 justify-content-between">
					<Button variant="primary" onClick={onClick}>
						Add
					</Button>

					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="find by name"
							className="me-2"
							aria-label="Search"
						/>
					</Form>
				</div>

				<div className="d-flex">
					<table className="table flex-column">
						<thead className="table-primary flex-column">
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Slot</th>
								<th>Trainer</th>
								<th>Location</th>
								<th>Price</th>
								<th>Date</th>
								<th>Attendant</th>
								<th>Image</th>
							</tr>
						</thead>
						<tbody className="flex-column">
							<tr>
								<th>Default</th>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td onClick>edit</td>
								<td onClick>delete</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="d-flex flex-column mx-auto w-100 justify-content-start">
					<nav aria-label="...">
						<ul className="pagination justify-content-end">
							<li className="page-item">
								<a className="page-link" href="#">
									Previous
								</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">
									1
								</a>
							</li>
							<li className="page-item active" aria-current="page">
								<a className="page-link" href="#">
									2 <span className="visually-hidden">(current)</span>
								</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">
									3
								</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</Layout>
	);
}

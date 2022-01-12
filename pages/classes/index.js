import Layout from "../../components/Layout";
import {
	Table,
	Form,
	FormControl,
	Button,
	Row,
	Col,
	Pagination,
} from "react-bootstrap";
import AddClassModal from "../../components/elements/addClassModal";

export default function Classes() {
	return (
		<Layout>
			<div className="container-fluid">
				<Row>
					<Col xs={3}>
						<Button href="/form" variant="primary" event="onClick">
							Add
						</Button>
					</Col>
					<Col>
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="find by name"
								className="me-2"
								aria-label="Search"
							/>
						</Form>
					</Col>
				</Row>
			</div>

			<div className="d-flex">
				<table className="table flex-column">
					<thead className="table-primary flex-column">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Type</th>
							<th scope="col">Slot</th>
							<th scope="col">Trainer</th>
							<th scope="col">Location</th>
							<th scope="col">Price</th>
							<th scope="col">Date</th>
							<th scope="col">Attendant</th>
							<th scope="col">Image</th>
						</tr>
					</thead>
					<tbody className="flex-column">
						<tr>
							<th scope="row">Default</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>

						<tr className="flex-column">
							<th scope="row">Primary</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Secondary</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Success</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Danger</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Warning</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Info</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Light</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Dark</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Light</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
						<tr className="flex-column">
							<th scope="row">Dark</th>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
							<td>Cell</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="container-fluid">
				<nav aria-label="...">
					<ul class="pagination justify-content-end">
						<li class="page-item">
							<a class="page-link" href="#">
								Previous
							</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">
								1
							</a>
						</li>
						<li class="page-item active" aria-current="page">
							<a class="page-link" href="#">
								2 <span class="visually-hidden">(current)</span>
							</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">
								3
							</a>
						</li>
						<li class="page-item">
							<a class="page-link" href="#">
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</Layout>
	);
}

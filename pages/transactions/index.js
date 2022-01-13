import Layout from "../../components/Layout";
import {
	Form,
	FormControl,
	Dropdown,
	DropdownButton,
	ButtonGroup,
} from "react-bootstrap";

export default function Transactions() {
	return (
		<Layout>
			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end">Transactions</h1>
				<div className="d-flex p-1 justify-content-end">
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="find by name"
							className="me-2"
							aria-label="Search"
						/>
					</Form>
					<DropdownButton
						as={ButtonGroup}
						title="Status"
						id="bg-nested-dropdown"
					>
						<Dropdown.Item eventKey="1">status</Dropdown.Item>
						<Dropdown.Item eventKey="2">status</Dropdown.Item>
					</DropdownButton>
				</div>

				<div className="d-flex">
					<table className="table flex-column">
						<thead className="table-primary flex-column">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Class</th>
								<th>Date</th>
								<th>Payment</th>
								<th>Receipt</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody className="flex-column">
							<tr>
								<th>Default</th>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
								<td>View</td>
								<td>Cell</td>
								<td onClick>Confirm</td>
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

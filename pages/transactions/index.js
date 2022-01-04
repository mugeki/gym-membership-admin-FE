import { Table } from "react-bootstrap";
import Layout from "../../components/Layout";

export default function Transactions() {
	return (
		<Layout>
			<div>
				<Table hover responsive variant="">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Class</th>
							<th>Date</th>
							<th>Payment</th>
							<th>Receipt</th>
						</tr>
					</thead>
					<tbody></tbody>
				</Table>
			</div>
		</Layout>
	);
}

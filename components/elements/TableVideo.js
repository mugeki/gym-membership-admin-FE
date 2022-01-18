import { Icon } from "@iconify/react";
import { Table } from "react-bootstrap";
import { handleDate, handleLowerCase } from "../../utils/helper";

export default function TableVideo({ entries }) {
	return (
		<Table hover responsive>
			<thead className="bg-primary text-white">
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Classification</th>
					<th>Admin ID</th>
					<th>Member Only</th>
					<th>Video</th>
					<th>Date Created</th>
				</tr>
			</thead>
			<tbody className="border-top-0">
				{entries?.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.title}</td>
						<td>{handleLowerCase(item.classification)}</td>
						<td>{item.admin_id}</td>
						<td>
							{item.member_only ? (
								<Icon icon="bi:check-lg" color="#69ba5b" />
							) : (
								<Icon icon="ep:close-bold" color="#cf5151" />
							)}
						</td>
						<td>
							<a href={item.url} target="_blank" rel="noreferrer">
								View
							</a>
						</td>
						<td>{handleDate(item.created_at)}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

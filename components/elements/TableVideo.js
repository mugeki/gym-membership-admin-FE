import { Icon } from "@iconify/react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	generateAxiosConfig,
	handleDate,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";

export default function TableVideo({
	entries,
	setError,
	onShowModal,
	refetch,
}) {
	const admin = useSelector((state) => state.admin);
	const onDelete = (id) => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.delete(`${API_URL}/videos/${id}`, generateAxiosConfig())
			.then(() => {
				refetch();
				toast.success("Video deleted", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setError(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	};
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
					<th>Actions</th>
				</tr>
			</thead>
			<tbody className="border-top-0">
				{entries?.map((item, i) => (
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
						<td>
							<>
								<div
									className="d-flex justify mb-2"
									style={{ cursor: "pointer" }}
								>
									<Icon icon="bx:bx-edit" color="#f5c542" className="my-auto" />
									<p
										className="my-auto ms-1 text-warning"
										onClick={() => {
											onShowModal({
												data: {
													id: item.id,
													index: i,
													title: item.title,
													classification_id: item.classification_id,
													url: item.url,
													member_only: item.member_only,
													admin_id: admin.id,
												},
												action: "edit",
											});
										}}
									>
										Edit
									</p>
								</div>
								<div className="d-flex" style={{ cursor: "pointer" }}>
									<Icon
										icon="bi:trash-fill"
										color="#cf5151"
										className="my-auto"
									/>
									<p
										className="my-auto ms-1 text-danger"
										onClick={() => {
											onDelete(item.id);
										}}
									>
										Delete
									</p>
								</div>
							</>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

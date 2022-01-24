import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
	generateAxiosConfig,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";

export default function TableAdmin({
	entries,
	setError,
	onShowModal,
	refetch,
}) {
	const onDelete = (id) => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.delete(`${API_URL}/admins/${id}`, generateAxiosConfig())
			.then(() => {
				refetch();
				toast.success("Admin deleted", {
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
					<th>Name</th>
					<th>Username</th>
					<th>Email</th>
					<th>Gender</th>
					<th>Phone Number</th>
					<th>Address</th>
					<th>Profile Image</th>
					<th>Super Admin</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody className="border-top-0">
				{entries?.map((item, i) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.fullname}</td>
						<td>{item.username}</td>
						<td>{item.email}</td>
						<td>{handleLowerCase(item.gender)}</td>
						<td>{item.telephone}</td>
						<td>{item.address}</td>
						<td>
							<Image
								src={item.url_image}
								objectFit="cover"
								width={"80px"}
								height={"80px"}
								alt="admin"
								className="rounded-circle"
							/>
						</td>
						<td>
							{item.is_super_admin ? (
								<Icon icon="bi:check-lg" color="#69ba5b" />
							) : (
								<Icon icon="ep:close-bold" color="#cf5151" />
							)}
						</td>
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
													...item,
													id: item.id,
													password: "",
													index: i,
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

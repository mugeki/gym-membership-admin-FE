import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import DateList from "./DateList";

export default function TableClass({
	entries,
	setError,
	onShowModal,
	refetch,
}) {
	const onDelete = (id) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.delete(`${API_URL}/classes/${id}`, generateAxiosConfig())
			.then(() => {
				refetch();
				toast.success("Class deleted", {
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
					<th>Description</th>
					<th>Type</th>
					<th>Slots</th>
					<th>Trainer</th>
					<th>Location</th>
					<th>Price</th>
					<th>Date</th>
					<th>Image</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody className="border-top-0">
				{entries?.map((item, i) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td>{item.description}</td>
						<td>{item.is_online ? "Online" : "Offline"}</td>
						<td>
							{item.participant}/{item.kuota}
						</td>
						<td>{item.trainer_name}</td>
						<td>{item.location}</td>
						<td>Rp{item.price.toLocaleString().replace(/,/g, ".")}</td>
						<td>
							<DateList data={item.date} />
						</td>
						<td>
							<Image
								src={item.url_image}
								objectFit="cover"
								width={"170px"}
								height={"100px"}
								alt="thumbnail"
								className="rounded"
							/>
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
													id: item.id,
													index: i,
													name: item.name,
													description: item.description,
													price: item.price,
													kuota: item.kuota,
													location: item.location,
													date: item.date,
													is_online: item.is_online,
													available_status: item.available_status,
													trainer_id: item.trainer_id,
													url_image: item.url_image,
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

import { Icon } from "@iconify/react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
	generateAxiosConfig,
	handleDate,
	handleLowerCase,
	handleUnauthorized,
} from "../../utils/helper";

export default function TableMembershipTransaction({
	entries,
	onStateChange,
	setError,
}) {
	const admin = useSelector((state) => state.admin);
	const onAction = (index, id, status, admin_id) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.put(
				`${API_URL}/transaction-membership/update-status/${id}?status=${status}&admin=${admin_id}`,
				{},
				generateAxiosConfig()
			)
			.then(() => {
				const newData = [...entries];
				newData[index].status = status;
				onStateChange({ data: newData });
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
					<th>User</th>
					<th>Class</th>
					<th>Date</th>
					<th>Total</th>
					<th>Payment</th>
					<th>Receipt</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody className="border-top-0">
				{entries?.map((item, i) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>
							<p className="m-0">{item.user_name}</p>
							<p className="m-0 text-light" style={{ fontSize: "14px" }}>
								User ID: {item.user_id}
							</p>
						</td>
						<td>{item.product_name}</td>
						<td>{handleDate(item.created_at)}</td>
						<td>Rp{item.nominal.toLocaleString().replace(/,/g, ".")}</td>
						<td>{item.payment.name}</td>
						<td>
							{item.url_image_of_receipt ? (
								<a
									href={item.url_image_of_receipt}
									target="_blank"
									rel="noreferrer"
								>
									View
								</a>
							) : (
								"No receipt"
							)}
						</td>
						<td>
							<div
								className={
									"d-inline-flex p-1 px-2 rounded shadow-sm " +
									(item.status === "waiting for payment"
										? "bg-light"
										: item.status === "waiting for confirmation"
										? "bg-warning"
										: item.status === "accepted"
										? "bg-success"
										: "bg-danger")
								}
								style={{ fontSize: "14px" }}
							>
								<p className="m-0 text-white">{handleLowerCase(item.status)}</p>
							</div>
						</td>
						<td>
							{item.status === "waiting for confirmation" && (
								<>
									<div
										className="d-flex justify mb-2"
										style={{ cursor: "pointer" }}
									>
										<Icon
											icon="akar-icons:circle-check-fill"
											color="#69ba5b"
											className="my-auto"
										/>
										<p
											className="my-auto ms-1 text-success"
											onClick={() => {
												onAction(i, item.id, "accepted", admin.id);
											}}
										>
											Confirm
										</p>
									</div>
									<div className="d-flex" style={{ cursor: "pointer" }}>
										<Icon
											icon="ep:circle-close-filled"
											color="#cf5151"
											className="my-auto"
										/>
										<p
											className="my-auto ms-1 text-danger"
											onClick={() => {
												onAction(i, item.id, "declined", admin.id);
											}}
										>
											Decline
										</p>
									</div>
								</>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

import Layout from "../../../components/Layout";
import {
	FormControl,
	Pagination,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
import axios from "axios";
import TableClassTransaction from "../../../components/elements/TableClassTransaction";

export default function ClassTransactions() {
	const [transactions, setTransactions] = useState({
		data: [],
		currPage: 1,
		pages: [],
	});
	const [filter, setFilter] = useState({
		status: "",
		date: "",
		formattedDate: "",
	});
	const [error, setError] = useState();

	const fetch = (page, status, date) => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/transaction-class?status=${status}&page=${page}&date=${date}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setTransactions({
						data: [],
						currPage: 1,
						pages: [],
					});
					setError("No record found");
				} else {
					const page = { ...res.data.page };
					const length = page.total_data / page.limit;
					const active = page.offset / page.limit + 1;
					const items = [];
					for (let i = 0; i < length; i++) {
						items.push(i + 1);
					}
					setTransactions({
						data: res.data.data,
						currPage: active,
						pages: items,
					});
					setError("");
				}
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setTransactions({
						data: [],
						currPage: 1,
						pages: [],
					});
					setError(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	};

	useEffect(() => {
		fetch(1, "", "");
	}, []);

	const handlePage = (index) => {
		fetch(index, filter.status, filter.formattedDate);
	};

	const handleFilterDate = (e) => {
		const date = e.target.value;
		if (date) {
			const formattedDate = new Date(Date.parse(date) + 86399000).toISOString();
			setFilter((state) => {
				fetch(1, state.status, formattedDate);
				return { ...state, date, formattedDate };
			});
		} else {
			setFilter((state) => {
				fetch(1, state.status, "");
				return { ...state, date: "" };
			});
		}
	};

	const handleFilterStatus = (status) => {
		setFilter((state) => {
			fetch(1, status, state.formattedDate);
			return { ...state, status };
		});
	};

	const onStateChange = (value) => {
		setTransactions((state) => {
			return { ...state, ...value };
		});
	};

	return (
		<Layout>
			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end mb-5">Classes Transactions</h1>
				<div className="d-flex flex-column flex-md-row justify-content-end mb-3">
					<div className="d-flex">
						<FormControl
							type="date"
							name="date"
							value={filter.date}
							className="me-2"
							onChange={handleFilterDate}
						/>
						<DropdownButton title="Status" id="bg-nested-dropdown">
							<Dropdown.Item
								disabled={filter.status === ""}
								onClick={() => {
									handleFilterStatus("");
								}}
							>
								All
							</Dropdown.Item>
							<Dropdown.Item
								disabled={filter.status === "accepted"}
								onClick={() => {
									handleFilterStatus("accepted");
								}}
							>
								Accepted
							</Dropdown.Item>
							<Dropdown.Item
								disabled={filter.status === "waiting-for-confirmation"}
								onClick={() => {
									handleFilterStatus("waiting-for-confirmation");
								}}
							>
								Waiting for confirmation
							</Dropdown.Item>
							<Dropdown.Item
								disabled={filter.status === "waiting-for-payment"}
								onClick={() => {
									handleFilterStatus("waiting-for-payment");
								}}
							>
								Waiting for payment
							</Dropdown.Item>
							<Dropdown.Item
								disabled={filter.status === "declined"}
								onClick={() => {
									handleFilterStatus("declined");
								}}
							>
								Declined
							</Dropdown.Item>
						</DropdownButton>
					</div>
				</div>

				<div className="mb-2">
					<TableClassTransaction
						entries={transactions.data}
						onStateChange={onStateChange}
						setError={setError}
					/>
					{error && <p className="text-center text-light mt-5">{error}</p>}
				</div>

				{transactions && (
					<Pagination className="align-self-center">
						{transactions.pages.map((item) => (
							<Pagination.Item
								key={item}
								active={item === transactions.currPage}
								onClick={() => handlePage(item)}
							>
								{item}
							</Pagination.Item>
						))}
					</Pagination>
				)}
			</div>
		</Layout>
	);
}

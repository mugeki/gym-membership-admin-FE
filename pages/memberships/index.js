import Layout from "../../components/Layout";
import { FormControl, Pagination, Button, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import axios from "axios";
import { Icon } from "@iconify/react";
import TableMembership from "../../components/elements/TableMembership";
import MembershipFormModal from "../../components/elements/MembershipFormModal";
import Head from "next/head";

export default function Memberships() {
	const [modalShow, setModalShow] = useState(false);
	const [memberships, setMemberships] = useState({
		data: [],
		currPage: 1,
		pages: [],
	});
	const [error, setError] = useState();
	const [modalProps, setModalProps] = useState();

	const fetch = (page) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/membership-products?page=${page}`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setMemberships({
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
					setMemberships((state) => {
						return {
							...state,
							data: res.data.data,
							currPage: active,
							pages: items,
						};
					});
					setError("");
				}
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setError(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	};

	useEffect(() => {
		fetch(1);
	}, [setMemberships]);

	const handlePage = (index) => {
		fetch(index, filter);
	};

	const onStateChange = (value) => {
		setMemberships((state) => {
			return { ...state, ...value };
		});
	};

	return (
		<Layout>
			<Head>
				<title>Memberships | Gymbro Admin Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<MembershipFormModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				entries={memberships?.data}
				data={modalProps?.data}
				action={modalProps?.action}
				onStateChange={onStateChange}
			/>
			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end mb-5">Memberships</h1>
				<div className="d-flex flex-column flex-md-row justify-content-between mb-3">
					<div className="d-flex">
						<Button
							className="mb-3 mb-md-0 w-100"
							onClick={() => {
								setModalProps({
									data: undefined,
									action: "add",
								});
								setModalShow(true);
							}}
						>
							Add
						</Button>
						<Button
							variant="outline-primary w-100"
							className="mb-3 ms-2 mb-md-0"
							onClick={() => {
								fetch(1);
							}}
						>
							Refresh
						</Button>
					</div>
				</div>

				<div className="mb-2">
					{memberships.data && (
						<TableMembership
							entries={memberships.data}
							setError={setError}
							onShowModal={(value) => {
								setModalProps(value);
								setModalShow(true);
							}}
							refetch={() => {
								fetch(memberships.currPage);
							}}
						/>
					)}
					{error && <p className="text-center text-light mt-5">{error}</p>}
				</div>

				{memberships && (
					<Pagination className="align-self-center">
						{memberships.pages.map((item) => (
							<Pagination.Item
								key={item}
								active={item === memberships.currPage}
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

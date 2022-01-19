import Layout from "../../components/Layout";
import { FormControl, Pagination, Button, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import axios from "axios";
import MembershipProductFormModal from "../../components/elements/MembershipProductFormModal";
import TableMembershipProduct from "../../components/elements/TableMembershipProduct";
import { Icon } from "@iconify/react";

export default function MembershipProduct() {
	const [modalShow, setModalShow] = useState(false);
	const [membershipProduct, setMembershipProduct] = useState({
		data: [],
		currPage: 1,
		pages: [],
	});
	const [filter, setFilter] = useState("");
	const [error, setError] = useState();
	const [modalProps, setModalProps] = useState();

	const fetch = (page, products) => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/membership-products=${products}&page=${page}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setMembershipProduct({
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
					setMembershipProduct((state) => {
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
		fetch(1, "");
	}, [setMembershipProduct]);

	const handlePage = (index) => {
		fetch(index, filter);
	};

	const onChange = (e) => {
		const value = e.target.value;
		setFilter(value);
	};

	const onStateChange = (value) => {
		setMembershipProduct((state) => {
			return { ...state, ...value };
		});
	};

	return (
		<Layout>
			<MembershipProductFormModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				entries={membershipProduct?.data}
				data={modalProps?.data}
				action={modalProps?.action}
				onStateChange={onStateChange}
			/>
			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end mb-5">products</h1>
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
								fetch(1, filter);
							}}
						>
							Refresh
						</Button>
					</div>
					<div className="d-flex">
						<InputGroup>
							<FormControl
								type="search"
								name="title"
								placeholder="Find title"
								aria-label="Search"
								value={filter}
								onChange={onChange}
							/>
							<Button
								variant="primary"
								onClick={() => {
									fetch(1, filter);
								}}
							>
								<Icon icon="ant-design:search-outlined" />
							</Button>
						</InputGroup>
					</div>
				</div>

				<div className="mb-2">
					{membershipProduct.data && (
						<TableMembershipProduct
							entries={membershipProduct.data}
							setError={setError}
							onShowModal={(value) => {
								setModalProps(value);
								setModalShow(true);
							}}
							onStateChange={onStateChange}
						/>
					)}
					{error && <p className="text-center text-light mt-5">{error}</p>}
				</div>

				{membershipProduct && (
					<Pagination className="align-self-center">
						{membershipProduct.pages.map((item) => (
							<Pagination.Item
								key={item}
								active={item === membershipProduct.currPage}
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

import Layout from "../../components/Layout";
import { FormControl, Table, Pagination, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import axios from "axios";
import AddVideoModal from "../../components/elements/AddVideoModal";
import TableVideo from "../../components/elements/TableVideo";

export default function Videos() {
	const [modalShow, setModalShow] = useState(false);
	const [videos, setVideos] = useState({
		filterSearch: "",
		data: [],
		currPage: 1,
		pages: [],
	});
	const [error, setError] = useState();

	const fetch = (page, title) => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/videos?title=${title}&page=${page}`,
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
					setVideos((state) => {
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
	}, [setVideos]);

	const handlePage = (index) => {
		fetch(index, videos.filterSearch);
	};

	return (
		<Layout>
			<AddVideoModal show={modalShow} onHide={() => setModalShow(false)} />
			<div className="d-flex flex-column mx-auto w-100 p-5 justify-content-start">
				<h1 className="text-end mb-5">Videos</h1>
				<div className="d-flex flex-column flex-md-row justify-content-between mb-3">
					<Button className="mb-3 mb-md-0" onClick={() => setModalShow(true)}>
						Add
					</Button>
					<div className="d-flex">
						<FormControl
							type="search"
							placeholder="Find title"
							className="me-2"
							aria-label="Search"
						/>
						{/* <DropdownButton
							as={ButtonGroup}
							title="Classification"
							id="bg-nested-dropdown"
						>
							<Dropdown.Item eventKey="1">status</Dropdown.Item>
							<Dropdown.Item eventKey="2">status</Dropdown.Item>
						</DropdownButton> */}
					</div>
				</div>

				<div className="mb-2">
					<TableVideo entries={videos.data} error={error} setError={setError} />
					{error && <p className="text-center text-light mt-5">{error}</p>}
				</div>

				{videos && (
					<Pagination className="align-self-center">
						{videos.pages.map((item) => (
							<Pagination.Item
								key={item}
								active={item === videos.currPage}
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

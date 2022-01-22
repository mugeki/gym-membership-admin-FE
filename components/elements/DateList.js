import { ListGroup, ListGroupItem } from "react-bootstrap";
import useHandleDate from "../../hooks/useHandleDate";

export default function DateList({ data }) {
	const { parseDateList } = useHandleDate();
	const dates = parseDateList(data);
	return (
		<>
			<ListGroup variant="flush">
				{dates.map((item, i) => (
					<ListGroupItem key={i}>
						{item.date} {item.hours}
					</ListGroupItem>
				))}
			</ListGroup>
		</>
	);
}

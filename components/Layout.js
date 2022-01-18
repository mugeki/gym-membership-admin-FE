import Navbar from "./elements/Navbar";

export default function Layout(props) {
	return (
		<div className="d-flex">
			<Navbar />
			{props.children}
		</div>
	);
}

import { Icon } from "@iconify/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./elements/Navbar";

export default function Layout(props) {
	const [toggled, setToggled] = useState(false);
	const onToggleSidebar = (value) => {
		setToggled(value);
	};
	return (
		<div className="d-flex">
			<Navbar toggled={toggled} onToggleSidebar={onToggleSidebar} />
			<div className="d-flex flex-column w-100" style={{ minWidth: "0" }}>
				<div
					className={
						"d-lg-none flex-shrink-0 d-flex justify-content-center bg-primary shadow rounded-circle ms-4 mt-4 p-2"
					}
					style={{ width: "40px", height: "40px", cursor: "pointer" }}
					onClick={() => onToggleSidebar(true)}
				>
					<Icon
						icon="charm:menu-hamburger"
						color="white"
						width="20"
						height="20"
						className="align-self-center"
					/>
				</div>
				{props.children}
			</div>
			<ToastContainer />
		</div>
	);
}

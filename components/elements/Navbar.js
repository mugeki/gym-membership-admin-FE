import {
	Menu,
	MenuItem,
	ProSidebar,
	SidebarHeader,
	SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../../styles/Navbar.module.css";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin } from "../../store/adminSlice";
import Cookies from "universal-cookie";

export default function Navbar({ toggled, onToggleSidebar }) {
	const admin = useSelector((state) => state.admin);
	const router = useRouter();
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const onLogout = () => {
		router.push("/login");
		cookies.remove("token", { path: "/", domain: window.location.hostname });
		dispatch(clearAdmin());
	};

	return (
		<ProSidebar toggled={toggled} onToggle={onToggleSidebar} breakPoint="lg">
			<SidebarHeader className="d-flex flex-nowrap align-items-center border-white p-4">
				<Image
					src={admin.url_image}
					width={"100px"}
					height={"100px"}
					objectFit="cover"
					className="rounded-circle"
					alt="profile"
				/>
				<div className="d-flex flex-column px-3 w-100">
					<p
						className="m-0 fw-bolder d-inline-block text-truncate"
						style={{ maxWidth: "130px" }}
					>
						{admin.fullname}
					</p>
					<p
						className="m-0"
						style={{ cursor: "pointer", fontSize: "14px" }}
						onClick={onLogout}
					>
						Logout
					</p>
				</div>
			</SidebarHeader>
			<SidebarContent className="py-4">
				<Menu iconShape="circle">
					<MenuItem
						active={router.pathname === "/admins"}
						icon={<Icon icon="akar-icons:person" />}
						hidden={!admin.is_super_admin}
					>
						<Link href={"/admins"}>Admins</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/classes"}
						icon={<Icon icon="ic:baseline-schedule" />}
						hidden={!admin.is_super_admin}
					>
						<Link href={"/classes"}>Classes</Link>
					</MenuItem>

					<MenuItem
						active={router.pathname === "/memberships"}
						icon={<Icon icon="ic:baseline-card-membership" />}
						hidden={!admin.is_super_admin}
					>
						<Link href={"/memberships"}>Memberships</Link>
					</MenuItem>

					<MenuItem
						active={router.pathname === "/newsletters"}
						icon={<Icon icon="fluent:news-16-regular" />}
						hidden={!admin.is_super_admin}
					>
						<Link href={"/newsletters"}>Newsletters</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/transactions"}
						icon={<Icon icon="carbon:receipt" />}
					>
						<Link href={"/transactions"}>Transactions</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/videos"}
						icon={<Icon icon="ant-design:video-camera-outlined" />}
						hidden={!admin.is_super_admin}
					>
						<Link href={"/videos"}>Videos</Link>
					</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	);
}

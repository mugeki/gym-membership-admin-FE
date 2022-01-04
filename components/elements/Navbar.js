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

export default function Navbar() {
	const router = useRouter();
	return (
		<ProSidebar toggled={true}>
			<SidebarHeader className="d-flex flex-nowrap align-items-center border-white p-4 h-100">
				<Image
					src="https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/08/31/genshin-impact-hu-tao-build-best-20210831033043.jpg"
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
						Nama
					</p>
					<p className="m-0" style={{ cursor: "pointer" }}>
						Logout
					</p>
				</div>
			</SidebarHeader>
			<SidebarContent className="py-4">
				<Menu iconShape="circle">
					<MenuItem
						active={router.pathname === "/transactions"}
						icon={<Icon icon="carbon:receipt" />}
					>
						<Link href={"/transactions"}>Transactions</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/admins"}
						icon={<Icon icon="akar-icons:person" />}
					>
						<Link href={"/admins"}>Admins</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/memberships"}
						icon={<Icon icon="ic:baseline-card-membership" />}
					>
						<Link href={"/memberships"}>Memberships</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/classes"}
						icon={<Icon icon="ic:baseline-schedule" />}
					>
						<Link href={"/classes"}>Classes</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/newsletters"}
						icon={<Icon icon="fluent:news-16-regular" />}
					>
						<Link href={"/newsletters"}>Newsletters</Link>
					</MenuItem>
					<MenuItem
						active={router.pathname === "/contents"}
						icon={<Icon icon="ant-design:video-camera-outlined" />}
					>
						<Link href={"/contents"}>Contents</Link>
					</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	);
}

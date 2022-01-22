import { app } from "../../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Spinner } from "react-bootstrap";

export default function FileUpload({ image, setImageSrc }) {
	const [loading, setLoading] = useState();
	const onChange = (e) => {
		if (app) {
			const file = e.target.files[0];
			const storageRef = getStorage();
			const fileRef = ref(storageRef, file.name);
			const compressionOption = {
				maxWidthOrHeight: 528,
				useWebWorker: true,
			};
			setLoading(true);
			imageCompression(file, compressionOption).then((compressedFile) => {
				uploadBytes(fileRef, compressedFile).then(() => {
					getDownloadURL(fileRef).then((url) => {
						setLoading(false);
						setImageSrc(url);
					});
				});
			});
		}
	};
	return (
		<label
			className="d-flex flex-column align-items-center justify-content-center border rounded py-2 mx-auto mb-3"
			style={{ cursor: "pointer", height: "170px" }}
			htmlFor="img"
		>
			{loading && <Spinner animation="border" variant="light" />}
			{image && !loading ? (
				<Image
					src={image || ""}
					width={"160px"}
					height={"120px"}
					alt="file"
					objectFit="cover"
					className="rounded"
				/>
			) : (
				<div className={loading ? "d-none" : "d-flex flex-column"}>
					<Icon
						icon="ant-design:upload-outlined"
						color="#a5acb8"
						width={"100px"}
						className="m-auto"
					/>
					<p className="m-0 fs-5 text-light">Upload image</p>
				</div>
			)}

			<input
				hidden={true}
				type="file"
				id="img"
				disabled={loading}
				onChange={onChange}
			/>
		</label>
	);
}

export default function useValidateForm() {
	const validateForm = (name, value, formValue = undefined) => {
		const regexName = /^[a-zA-Z ]{3,}$/;
		const regexUsername = /^[A-Za-z0-9_]{6,}$/;
		const regexPassword = /.{6,}$/;
		const regexEmail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const regexPhone = /^[0-9]{10,15}$/;

		let messages = {};

		if (!formValue) {
			if (name === "telephone" && !regexPhone.test(value)) {
				messages = { [name]: "Invalid phone number" };
			} else if (name === "phone" && regexPhone.test(value)) {
				messages = { [name]: "" };
			}
			if (name === "email" && !regexEmail.test(value)) {
				messages = { [name]: "Invalid email format" };
			} else if (name === "email" && regexEmail.test(value)) {
				messages = { [name]: "" };
			}
			if (name === "full_name" && !regexName.test(value)) {
				messages = { [name]: "Min. 3 character" };
			} else if (name === "full_name" && regexName.test(value)) {
				messages = { [name]: "" };
			}
			if (name === "username" && !regexUsername.test(value)) {
				messages = { [name]: "Min. 6 character, underscore symbol allowed" };
			} else if (name === "username" && regexUsername.test(value)) {
				messages = { [name]: "" };
			}
			if (name === "password" && !regexPassword.test(value)) {
				messages = {
					[name]: "Min. 6 character",
				};
			} else if (name === "password" && regexPassword.test(value)) {
				messages = { [name]: "" };
			}
		} else if (formValue) {
			for (const key in formValue) {
				if (formValue[key] === "") {
					messages[key] = "Field cannot be empty";
				}
			}
		}

		return messages;
	};

	return { validateForm };
}

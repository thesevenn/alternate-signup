import {z} from "zod";

export const signupSchema = z.object({
	firstName: z
		.string({error: "First Name is required"})
		.min(3, {error: "First Name should be atleast 3 letters"})
		.max(40, {error: "First Name should not be less than 40 letters"}),
	lastName: z
		.string({error: "Last Name is required"})
		.min(3, {error: "Last Name should be atleast 3 letters"})
		.max(40, {error: "Last Name should not be less than 40 letters"}),
	email: z.email({error: "Enter a valid email"}),
	mobile: z
		.string({error: "Mobile number is required"})
		.regex(/^\d{10}$/, {error: "Enter valid 10 digit mobile number"}),
	password: z
		.string({error: "Password is required"})
		.min(8, {error: "Password should be minimum 8 chars long"})
		.max(50, {error: "Password cannot be longer than 50 chars"}),
	dob: z
		.string({error: "DOB is required in format:DD/MM/YYYY"})
		.regex(/^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/](\d{4})$/, {
			error: "Enter DOB in format: DD/MM/YYYY",
		}),
});

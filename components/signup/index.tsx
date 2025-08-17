"use client";
import {FC, useState} from "react";
import Image from "next/image";

import {z} from "zod";
import axios from "axios";
import {toast} from "sonner";
import {hash} from "bcryptjs";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import styles from "./signup.module.scss";
import {Error} from "../error";
import {Spinner} from "../spinner";
import {Button} from "@/components/button";
import {signupSchema} from "@/libs/validation";
import {Input, Checkbox, Password} from "@/components/input";

const Signup: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(true);
	const [agreeTOS, setAgreeTOS] = useState<boolean>(false);
	const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
	// const [registrationSuccess, setRegistrationSuccess] =
	// 	useState<boolean>(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitting},
	} = useForm({resolver: zodResolver(signupSchema), reValidateMode: "onBlur"});

	const onSubmit = async (data: z.output<typeof signupSchema>) => {
		const salt = 8;
		const encryptedPassword = await hash(data.password, salt);

		const formattedData = {
			email: data.email,
			firstname: data.firstName,
			lastname: data.lastName,
			dob: "2022-12-20",
			mobile: "+91" + data.mobile,
			encryptpassword: encryptedPassword,
		};

		const id = toast.loading("Creating your account, please wait...");
		try {
			// request to given endpoint is made using next.js api route.
			// please open file at /app/api/register where post request to
			// https://atologistinfotech.com/api/register.php is been made
			const response = await axios.post(
				"/api/register",
				JSON.stringify(formattedData),
				{
					headers: {"Content-Type": "application/json"},
				}
			);

			toast.dismiss(id);
			if (response.status == 200 || response.status == 201) {
				// setRegistrationSuccess(true);
				reset();
				setAgreePolicy(false);
				setAgreeTOS(false);
				toast.success("Registration Successful. Proceed to login!!", {id});
			} else if (response.status == 401) {
				toast.info("Invalid format, Please try again", {id});
			}
		} catch (error) {
			toast.error(
				"An error occured while regsitration process. Try again later",
				{id}
			);
			console.warn("Error", error);
		}
	};

	return (
		<div className={styles.signupMain}>
			<div className={styles.signupContainer}>
				<h1>Welcome to Atologist Infotech</h1>
				<h2>Create your account</h2>
				<button>
					<Image width={40} height={40} alt="google logo" src="/google.png" />
				</button>
				<div className={styles.or}>OR</div>
				<form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputInline}>
						<Input
							label="First Name"
							placeholder="Enter you first name"
							{...register("firstName", {required: true})}
						/>
						<Input
							label="Last Name"
							placeholder="Enter you last name"
							{...register("lastName", {required: true})}
						/>
					</div>
					{errors.firstName && <Error message={errors.firstName.message} />}
					{errors.lastName && <Error message={errors.lastName.message} />}
					<Input
						label="Email"
						placeholder="Enter your email"
						{...register("email", {required: true})}
					/>
					{errors.email && <Error message={errors.email.message} />}
					<Input
						label="Mobile"
						placeholder="Enter your mobile number"
						{...register("mobile", {required: true})}
					/>
					{errors.mobile && <Error message={errors.mobile.message} />}
					<Password
						label="Password"
						placeholder="Enter your password"
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						{...register("password", {required: true})}
					/>
					{errors.password && <Error message={errors.password.message} />}
					<Input
						label="DOB"
						placeholder="Enter your dateofbirth"
						{...register("dob", {required: true})}
					/>
					{errors.dob && <Error message={errors.dob.message} />}
					<div className={styles.agreeto}>
						<p>I agree to</p>
						<div>
							<Checkbox
								label="Terms of Service"
								checked={agreeTOS}
								onChange={() => setAgreeTOS(prev => !prev)}
							/>
							<Checkbox
								label="Privacy Policy"
								checked={agreePolicy}
								onChange={() => setAgreePolicy(prev => !prev)}
							/>
						</div>
					</div>
					<Button disabled={isSubmitting || !agreePolicy || !agreeTOS}>
						{isSubmitting ? (
							<span className={styles.loading}>
								<Spinner />
								Please wait...
							</span>
						) : (
							"Create Account"
						)}
					</Button>
				</form>
			</div>
			<div className={styles.illustration}>
				<Image
					width={400}
					height={400}
					src="/illustration_high.png"
					alt="vector illustration showing a girl interacting with a kiosk and a robot besides her."
				/>
			</div>
		</div>
	);
};
export default Signup;

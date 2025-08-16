import {forwardRef, InputHTMLAttributes} from "react";

import styles from "./input.module.scss";
import {OpenEye, CloseEye} from "../icons";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	placeholder?: string;
}
const Input = forwardRef<HTMLInputElement, PropsType>(
	({label, placeholder, ...props}, ref) => {
		return (
			<label className={styles.label}>
				{label}
				<input placeholder={placeholder} {...props} ref={ref} />
			</label>
		);
	}
);

const Checkbox = forwardRef<HTMLInputElement, PropsType>(
	({label, placeholder, ...props}, ref) => {
		return (
			<label className={styles.checkbox}>
				<input placeholder={placeholder} {...props} ref={ref} type="checkbox" />
				{label}
			</label>
		);
	}
);

const Password = forwardRef<
	HTMLInputElement,
	PropsType & {showPassword: boolean; setShowPassword: (value: boolean) => void}
>(({label, placeholder, showPassword, setShowPassword, ...props}, ref) => {
	return (
		<div className={styles.password}>
			<label className={styles.label}>
				{label}
				<input
					placeholder={placeholder}
					{...props}
					ref={ref}
					type={showPassword ? "text" : "password"}
				/>
				<span onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? <OpenEye /> : <CloseEye />}
				</span>
			</label>
		</div>
	);
});

Input.displayName = "CustomInput";
Checkbox.displayName = "CustomCheckbox";
Password.displayName = "CustomPassword";
export {Input, Checkbox, Password};

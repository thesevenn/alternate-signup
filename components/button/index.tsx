import {FC, ButtonHTMLAttributes, ReactNode} from "react";

import styles from "./button.module.scss";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
const Button: FC<PropsType> = ({children, ...props}) => {
	return (
		<button {...props} className={styles.button}>
			{children}
		</button>
	);
};

Button.displayName = "CustomButton";
export {Button};

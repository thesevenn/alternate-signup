import {FC} from "react";

import styles from "./error.module.scss";

interface PropsType {
	message?: string;
}
const Error: FC<PropsType> = ({message}) => {
	return <p className={styles.errorMessage}>{message}</p>;
};

export {Error};

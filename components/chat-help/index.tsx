import {FC} from "react";
import Image from "next/image";

import styles from "./chat-help.module.scss";

const ChatHelp: FC = () => {
	return (
		<div className={styles.chatCircle} title="Need help?">
			<Image src="/message.png" alt="message icon" width={200} height={200} />
		</div>
	);
};

export default ChatHelp;

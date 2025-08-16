import Image from "next/image";
import Link from "next/link";

import styles from "./app.module.scss";
import ChatHelp from "@/components/chat-help";
import Signup from "@/components/signup";

export default function Home() {
	// const response = fetch(
	// 	"https://atologistinfotech.com/api/register.php?firstname=john&lastname=doe&passwordencrypt=3jj99jfjjf9384d&dob=19-12-2001&mobile=9191881291",
	// 	{method: "POST"}
	// );

	return (
		<main>
			<header className={styles.header}>
				<div>
					<Image
						height={400}
						width={400}
						src="/logo.png"
						alt="Atologist Infotech Logo"
						className={styles.logo}
					/>
				</div>
				<p className={styles.accountExist}>
					Already have an account? <Link href="/">Sign in</Link>
				</p>
			</header>
			<Signup />
			<ChatHelp />
		</main>
	);
}

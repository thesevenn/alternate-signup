import axios from "axios";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const fromatted = new URLSearchParams(data);
		const response = await axios.post(
			"https://atologistinfotech.com/api/register.php",
			fromatted,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
			}
		);

		return new Response(JSON.stringify(response.data), {
			status: response.status,
			headers: {"Content-Type": "application/json"},
		});
	} catch (error: unknown) {
		// @ts-expect-error No clear type hint
		console.log(error?.message);
		return new Response(JSON.stringify({error: "Internal server error"}), {
			status: 500,
			headers: {"Content-Type": "application/json"},
		});
	}
}

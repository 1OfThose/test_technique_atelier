import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Components/Home/Home";

const getPlayersFromApi = () => {
	return fetch("https://data.latelier.co/training/tennis_stats/headtohead.json").then(res => {
		if (res.status === 200) return res.json();
		else throw new Error("Response error");
	});
};

describe("Get players", () => {
	it("should fetch the tennis players from the API", async () => {
		getPlayersFromApi.mockResolvedValue({
			players: [{ firstname: "Venus" }],
		});
		render(<Home />);
		await waitFor(() => {
			screen.getByText("Venus");
		});
	});
});

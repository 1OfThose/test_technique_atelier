import React, { useState, useEffect, useReducer, useMemo } from "react";
import { INITIAL_STATE, playersReducer } from "./playersReducer";

import axios from "axios";
import PlayerCard from "./PlayerCard/PlayerCard";
import PlayerDetails from "./PlayerDetails/PlayerDetails";

export default function Home() {
	// J'utilise useReducer pour mettre à jour plusieurs states au même temps,
	// au lieu de créer 3 states différents pour le chargement, erreur et données
	const [state, dispatch] = useReducer(playersReducer, INITIAL_STATE);
	const [searchInputValue, setSearchInputValue] = useState("");

	const [openPlayerDetails, setOpenPlayerDetails] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState(null);

	const filterPlayers = useMemo(() => {
		return state.players.filter(player => {
			return (
				player.firstname.toLowerCase().includes(searchInputValue.toLowerCase()) ||
				player.lastname.toLowerCase().includes(searchInputValue.toLowerCase())
			);
		});
	}, [searchInputValue, state.players]);

	const getPlayers = async cancelToken => {
		try {
			dispatch({ type: "API_START" });
			await axios
				.get("https://data.latelier.co/training/tennis_stats/headtohead.json", { cancelToken: cancelToken })
				.then(res => {
					dispatch({ type: "API_SUCCESS", payload: res.data.players });
				});
		} catch (error) {
			dispatch({ type: "API_ERROR" });
			if (axios.isCancel(error)) {
				// en environnement de developpement, react strict mode affichera ce console log plusieurs fois
				console.log("Requête annulée");
			} else {
				//TODO : handle other errors
			}
		}
	};

	const showPlayerDetails = player => {
		setSelectedPlayer(player);
		setOpenPlayerDetails(true);
	};

	useEffect(() => {
		// gerer le cas ou la requête est annulée
		const cancelRequestToken = axios.CancelToken.source();
		getPlayers(cancelRequestToken.token);

		// fonction de cleanup
		return () => {
			cancelRequestToken.cancel();
		};
	}, []);

	return (
		<section id="home">
			<PlayerDetails
				openPlayerDetails={openPlayerDetails}
				setOpenPlayerDetails={setOpenPlayerDetails}
				selectedPlayer={selectedPlayer}
			/>
			<div className="container mx-auto flex items-start justify-start py-24 px-5 md:px-0">
				<div className="flex flex-col items-center justify-center max-w-full w-full md:w-[40%]">
					<input
						value={searchInputValue}
						onChange={e => setSearchInputValue(e.target.value)}
						type="text"
						placeholder="Recherchez un joueur"
						className="montserrat bg-black/30 rounded-2xl p-4 py-5 w-full outline-none focus:ring-2 focus:ring-orange-200 text-white"
					/>
					<div className="w-full flex flex-col items-center justify-center space-y-8 mt-14">
						{filterPlayers.map(player => (
							<PlayerCard player={player} showPlayerDetails={showPlayerDetails} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

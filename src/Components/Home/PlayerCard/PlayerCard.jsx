import React from "react";

export default function PlayerCard({ player, showPlayerDetails }) {
	return (
		<div
			onClick={() => showPlayerDetails(player)}
			key={player.id}
			className="flex flex-col md:flex-row items-center w-full shadow-xl bg-white md:h-[200px] overflow-hidden cursor-pointer relative"
		>
			<div className="w-full md:w-[40%] h-full overflow-hidden">
				<img
					src={player.picture}
					alt={`${player.firstname} ${player.lastname}`}
					className={`w-[280px] absolute top-0 -right-8 md:right-auto md:left-0 ${
						player.lastname === "Williams" && `top-12 md:top-2 md:-left-0`
					}`}
				/>
			</div>
			<div className="p-5 w-full md:w-[60%] flex flex-col items-start">
				<h2 className="montserrat text-[#F2753B] font-bold text-2xl mb-10">
					{player.firstname} {player.lastname}
				</h2>
				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
					<div className="flex flex-col">
						<span className="uppercase text-black/30 font-bold tracking-widest">RANK</span>
						<span className="montserrat font-bold text-[#F2753B]">#{player.data.rank}</span>
					</div>
					<div className="flex flex-col">
						<span className="uppercase text-black/30 font-bold tracking-widest">POINTS</span>
						<span className="montserrat font-bold text-[#F2753B]">{player.data.points}</span>
					</div>
					<div className="flex flex-col">
						<span className="uppercase text-black/30 font-bold tracking-widest">COUNTRY</span>
						<span className="montserrat font-bold text-[#F2753B]">{player.country.code}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useRef, useEffect } from "react";

import { TfiClose } from "react-icons/tfi";

export default function PlayerDetails({ selectedPlayer, setOpenPlayerDetails, openPlayerDetails }) {
	const ref = useRef();

	console.log(selectedPlayer);

	//detecter click à l'exterieur du contenu du popup et fermer le popup
	const handleOutsideClick = e => {
		if (ref.current.contains(e.target)) {
			return;
		}

		setOpenPlayerDetails(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []); //eslint-disable-line

	if (!selectedPlayer) return "";

	return (
		<div
			className={
				openPlayerDetails
					? "fixed top-0 left-0 w-full min-h-screen bg-black/70 z-50 opacity-100 transition-all duration-300 ease-in-out"
					: "fixed top-0 left-0 w-full min-h-screen bg-black/70 z-50 opacity-0 pointer-events-none transition-all duration-300 ease-in-out"
			}
		>
			<div className={openPlayerDetails ? "animateDetails flex flex-col items-center justify-between" : "hidden"}>
				<div onClick={() => setOpenPlayerDetails(false)} className=" py-5 md:py-12 cursor-pointer">
					<TfiClose className="text-white text-2xl md:text-[3rem]" />
				</div>
				<div
					ref={ref}
					className="w-full lg:w-[95%] xl:w-[85%] mt-auto h-[1000px] bg-white shadow-3xl relative flex flex-col "
				>
					<div>
						<div
							className={`hidden md:block absolute -left-40 ${
								selectedPlayer.firstname === "Serena" && `bottom-12`
							} ${selectedPlayer.firstname === "Venus" && `bottom-16`} pointer-events-none`}
						>
							<img
								src={selectedPlayer.picture}
								alt={`${selectedPlayer.firstname} ${selectedPlayer.lastname}`}
								className="w-[600px] pointer-events-none"
							/>
						</div>
						<div className="flex items-start justify-between">
							<div className="md:pl-64 md:pt-[7rem] px-6 pt-6 md:px-0">
								<h1 className="mobileStrokedText md:strokedText text-4xl lg:text-[4rem] xl:text-[6rem] 2xl:text-[8rem] montserrat font-bold tracking-wider">
									{selectedPlayer.firstname}
								</h1>
								<h1 className="text-4xl lg:text-[7rem] xl:text-[9rem] 2xl:text-[11rem] montserrat font-extrabold text-[#F2753B] lg:mt-12 xl:mt-20 2xl:mt-28">
									{selectedPlayer.lastname}
								</h1>
							</div>
							<div className="p-5 md:p-16 flex flex-col items-start justify-center">
								<img
									src={selectedPlayer.country.picture}
									alt={selectedPlayer.country.code}
									className="w-[100px] md:w-[180px] shadow-lg"
								/>
								<span className="mt-2 md:mt-6 text-2xl md:text-[3.5rem] tracking-[1rem] text-black/30 montserrat md:font-light">
									{selectedPlayer.country.code}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row items-start justify-between w-full md:w-[70%] self-end mt-2 md:mt-48 md:p-0 p-6">
						<div className="w-full md:w-[55%] grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 md:pl-24 lg:pl-9">
							<div className="flex flex-col">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									RANK
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									#{selectedPlayer.data.rank}
								</span>
							</div>
							<div className="flex flex-col">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									POINTS
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									{selectedPlayer.data.points}
								</span>
							</div>
							<div className="flex flex-col">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									COUNTRY
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									{selectedPlayer.country.code}
								</span>
							</div>
							<div className="flex flex-col col-span-2 md:col-span-1">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									BIRTHDAY
								</span>
								{/* Birthday n'est pas dans nos données, par contre on connait son age donc on peut au moins connaitre son année de naissance */}
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									XX / XX / {new Date().getFullYear() - selectedPlayer.data.age}
								</span>
							</div>
							<div className="flex flex-col xl:col-span-2">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									AGE
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									{selectedPlayer.data.age}
								</span>
							</div>
							{/* le weight dans les données était un peu trop elevé, donc j'ai pensé de le diviser par mille */}
							<div className="flex flex-col">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									WEIGHT
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									{selectedPlayer.data.weight / 1000} kg
								</span>
							</div>
							<div className="flex flex-col">
								<span className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
									HEIGHT
								</span>
								<span className="montserrat md:text-xl mt-2 font-bold text-[#F2753B]">
									{selectedPlayer.data.height} cm
								</span>
							</div>
						</div>
						<div className="w-full mt-8 md:mt-0 md:w-[35%] flex flex-col h-[350px] overflow-y-auto pb-8">
							<h5 className="uppercase md:text-xl text-black/30 font-bold tracking-widest">
								CAREER TITLES
							</h5>
							{selectedPlayer.data.last.map((title, i) => (
								<div key={i} className="mb-4">
									<h5 className="font-bold montserrat text-[#F2753B] text-xl">
										{new Date().getFullYear()} <span className="font-normal">- {title}</span>
									</h5>
									<div className="flex flex-col">
										<span className="text-[#F2753B]">Lorem ipsum dolor sit amet.</span>
										<span className="text-[#F2753B]">Lorem ipsum dolor sit amet.</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import {Link} from "lucide-react";
import SettingSection from "../settings/SettingSection.jsx";
import {useEffect, useState} from "react";
import {LinkTable} from "./LinkTable.jsx";

export function LinkSection ()
{
	const API_URL = import.meta.env.VITE_BACKEND_URL

	const [year, setYear] = useState(null);
	const [month, setMonth] = useState(null);
	const [ monthsItems, setMonthsItems ] = useState([]);
	const [dates, setDates] = useState({})
	const [links, setLinks] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/dates`)
			.then((res) => res.json())
			.then((data) => {
				setDates(data)
				if (data) {
					const value = Object.keys(data)[0]
					setYear(value);
					setMonthsItems(data[value]);
				}
			})
	}, [])

	const fetchLinks = () => {
		const path = `${year}${month == null ? "": "?month=" + encodeURIComponent(month)}`;
		fetch(`${API_URLL}/data/${path}`)
			.then((res) => res.json())
			.then((data) => {
				setLinks(data);
			})
			.catch((err) => {
				console.error(err);
				setLinks([])
			})
	}

	const updateYear = (value) => {
		setYear(value);
		setMonth(null);
		setMonthsItems(dates[value]);
	}

	const updateMonth = (value) => {
		setMonth(value);
	}

	return (
		<div>
			<SettingSection icon={Link} title={"Trips"}>
				<div className='flex-1 overflow-auto relative z-10'>
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2">
							<div className='flex justify-center items-center mb-1'>
								<h2 className='text-xl font-semibold text-gray-100'>
									Selecciona año y fecha (opcional) para descargar
								</h2>
							</div>
						</div>
						{/* AÑO */}
						<div className="col-span-1 mb-5">
							<div className='flex justify-center items-center mb-1'>
								<label htmlFor="years"
									   className="block mb-2 font-medium text-white-900 dark:text-white">
									Año
								</label>
							</div>
							<div className='flex justify-center items-center mb-6'>
								<select className="text-white-700 border-2"
										id="years"
										name='selectYear'
										onChange={e => updateYear(e.target.value)}
								>
									{Object.keys(dates).sort().map((item, i) => (
										<option key={i} value={item}>{item}</option>
									))}
								</select>
							</div>
						</div>
						{/* MES */}
						<div className="col-span-1 mb-5">
							<div className='flex justify-center items-center mb-1'>
								<label htmlFor="month"
									   className="block mb-2 font-medium text-white-900 dark:text-white">
									Año
								</label>
							</div>
							<div className='flex justify-center items-center mb-6'>
								<select className="text-white-700 border-2"
										id="month"
										name='selectMonth'
										onChange={e => updateMonth(e.target.value)}
								>
									{monthsItems.map((item, i) => (
										<option key={i} value={item}>{item && item === "0" ? "All" : item}</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>
				<button
					disabled={year == null}
					onClick={() => fetchLinks()}
					className={`${year == null ? "bg-gray-600" : "bg-indigo-600"} hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition
					duration-200 w-full sm:w-auto`}
				>
					Obtener links
				</button>
			</SettingSection>
			<LinkTable tableData={links}></LinkTable>
		</div>
)
}

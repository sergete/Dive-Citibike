"use client";

import {useState} from "react";
import {StatsCarousel} from "@/components/stats/Carousel.tsx";
import {IStats} from "@/components/common/interfaces/StatsInterface.ts";
import {useStatsDates} from "@/hooks/use-dates.ts";
import {DateHandler} from "@/components/common/handler/DateHandler.tsx";
import CONSTANTS from "@/lib/constants"


export function StatsSection ()
{
	const [stats, setStats] = useState<IStats>({
		data: []
	});
	const { status, data, error } = useStatsDates()


	const fetchStats = (year: string, month: string) => {
		fetch(`${CONSTANTS.API_URL}/${year}/${month}`)
			.then((res) => res.json())
			.then((data) => {
				setStats({data: data});
			})
			.catch((err) => {
				console.error(err);
				setStats({
					data: []
				})
			})
	}

	return (
		<div>
			<div className="relative flex flex-col justify-center mb-5 p-10 border border-gray-200">
				<div>
					<DateHandler callback={fetchStats}
								 status={status}
								 data={data == undefined ? {}: data} error={error}
								 buttonDes="Listar Stats"
								 monthNeeded={true}
					/>
				</div>
			</div>
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<StatsCarousel statsObject={stats} />
			</div>
		</div>
)
}

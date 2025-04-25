"use client";

import {useState} from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Download
} from "lucide-react"
import {DateHandler} from "@/components/common/handler/DateHandler.tsx";
import {useDates} from "@/hooks/use-dates.ts";


export function LinkSection ()
{
	const API_URL = "http://127.0.0.1:8090/api/v1/trips/bikes"

	const [links, setLinks] = useState([]);
	const { status, data, error } = useDates()

	const fetchLinks = (year: string, month?: string) => {
		const path = `${year}${month == undefined ? "": "?month=" + encodeURIComponent(month)}`;
		console.log("FetchLinks");
		fetch(`${API_URL}/data/${path}`)
			.then((res) => res.json())
			.then((data) => {
				setLinks(data);
			})
			.catch((err) => {
				console.error(err);
				setLinks([])
			})
		console.log("Retrieved links")
		console.log(links)
	}

	const onDownload = (item: string) => {
		console.log(item);
		window.open(item, "_blank")
		console.log("finished")
	}

	return (
		<div>
			<div className="relative flex flex-col justify-center mb-5 p-5 border border-gray-200">
				<div>
					<DateHandler callback={fetchLinks}
								 status={status}
								 data={data == undefined ? {}: data} error={error}
								 buttonDes="Listar links"
					/>
				</div>
			</div>
			<div className="relative flex flex-row justify-center p-5 border border-gray-200">
				<Table>
					<TableCaption>Una muestra de los links.</TableCaption>
					<TableHeader>
						<TableRow >
							<TableHead className="w-[100px]">Link</TableHead>
							<TableHead>Download</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{links.map((link) => (
							<TableRow key={link}>
								<TableCell className="font-medium">{link}</TableCell>
								<TableCell>
									<div className='flex flex-row justify-center items-center'>
										<Download
											onClick={() => onDownload(link)}
											className='text-indigo-400 hover:text-indigo-300 mr-2'
											size={22}>
										</Download>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

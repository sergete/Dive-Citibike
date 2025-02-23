import { motion } from "framer-motion";
import {Download} from "lucide-react";
import {useState} from "react";

export function LinkTable ({ tableData })
{
	const [isLoading, setIsLoading] = useState(false);

	const onDownload = (item) => {
		setIsLoading(true);
		console.log(item);
		window.open(item, "_blank")
		console.log("finished")
		setIsLoading(false);
	}

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{delay: 0.2}}
		>
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Link
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
					{tableData.map((item, index) => (
						<motion.tr
							key={index}
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							transition={{duration: 0.3}}
						>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='ml-4'>
										<div className='text-sm font-medium text-gray-100'>{item}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								<div className='flex items-center'>
									<Download
										disabled={isLoading}
										onClick={() => onDownload(item)}
										className='text-indigo-400 hover:text-indigo-300 mr-2'
										size={22}>
									</Download>
								</div>
							</td>
						</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	)
}

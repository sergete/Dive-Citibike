import {StatsSection} from "@/components/stats/StatsSection.tsx";
import {Header} from "@/components/common/header.tsx";


export default function StatsPage ()
{
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Stats'/>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<StatsSection/>
			</main>
		</div>
	);
};

import Header from "../components/common/Header.jsx";
import {StatsSection} from "../components/stats/StatsSection.jsx";


export default function StatsPage ()
{
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Links'/>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<StatsSection/>
			</main>
		</div>
	);
};

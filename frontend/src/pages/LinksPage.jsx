import Header from "../components/common/Header";
import {LinkSection} from "../components/links/LinkSection.jsx";


export default function LinksPage ()
{
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Links'/>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<LinkSection/>
			</main>
		</div>
	);
};

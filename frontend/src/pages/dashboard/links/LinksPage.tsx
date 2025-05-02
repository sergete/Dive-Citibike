import {LinkSection} from "@/components/links/LinkSection.tsx";
import {Header} from "@/components/common/header.tsx";


export default function LinksPage ()
{
	return (
		<div className='flex-1 overflow-auto relative z-5'>
			<Header title='Trips'/>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<LinkSection/>
			</main>
		</div>
	);
};

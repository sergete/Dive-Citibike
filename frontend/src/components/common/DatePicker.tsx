import {useState} from "react";
import {YearSelector} from "@/components/common/selectors/year_selector.tsx";
import {MonthSelector} from "@/components/common/selectors/month_selector.tsx";
import {Button} from "@/components/ui/button.tsx";

export function DatePicker({callback, dates, buttonDes, monthNeeded}:
                           { callback: any, dates: {[key:string]: string[]}, buttonDes: string, monthNeeded: boolean }, ) {

    const [year, setYear] = useState<string | undefined>(undefined)
    const [month, setMonth] = useState<string | undefined>(undefined)

    let ignoreMonth = !monthNeeded
    let disableMonth = monthNeeded && month == null
    let disableButton = year == null || (!ignoreMonth && disableMonth)

    return (
        <div>
            <div className="relative flex flex-col justify-center mb-5 p-10 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-5">
                        <div className='flex justify-center items-center'>
                            <h2 className='font-semibold text-xl text-black'>
                                Selecciona año y mes
                            </h2>
                        </div>
                    </div>
                    {/* AÑO */}
                    <div className="col-span-1 mb-5">
                        <div className='flex justify-center items-center'>
                            <YearSelector handle={setYear} label="Selecciona Año" items={dates}/>
                        </div>
                    </div>
                    <div className="col-span-1 mb-5">
                        <div className='flex justify-center items-center'>
                            <MonthSelector handle={setMonth} label="Selecciona Mes"
                                           items={year != undefined ? dates[year] : []}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-center items-center">
                        <div className="col-span-1 mb-5">
                            <Button
                                disabled={disableButton}
                                onClick={() => callback(year, month)}
                                className={`${year == null ? "bg-gray-600 text-black" : "button-primary text-white"} hover:bg-indigo-700 font-bold py-2 px-4 rounded transition
					duration-200 w-full sm:w-auto`}
                            >
                                { buttonDes }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

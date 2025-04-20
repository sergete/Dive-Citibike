import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function StatsCard({name, dataStations, dataDays}: {
    name: string,
    dataStations: [
        {
            start_station_name: string,
            start_station_id: string,
            len: number
        }
    ],
    dataDays: [
        {
            weekday: string,
            day: string,
            len: number
        }
    ]
}) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>{ name }</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid grid-cols-12 items-start gap-4">
                        <div className="col-span-6">
                            <div className="flex flex-col space-y-1.5">
                                {/* Stations Section */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-700">Top Stations</h3>
                                    <ul className="mt-2 space-y-2">
                                        {dataStations.map((station, index) => (
                                            <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                                                <p className="text-gray-800 font-medium">Station
                                                    ID: {station.start_station_id || "Unknown"}</p>
                                                <p className="text-gray-500 text-sm">Trips: {station.len}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col space-y-1.5">
                                {/* Days Section */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-700">Top Days</h3>
                                    <ul className="mt-2 space-y-2">
                                        {dataDays.map((day, index) => (
                                            <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                                                <p className="text-gray-800 font-medium">{day.day}</p>
                                                <p className="text-gray-500 text-sm">Trips: {day.len}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}



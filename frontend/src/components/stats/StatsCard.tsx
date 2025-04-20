

export function Card({ data }: {data: {
    stats: {
        [key: string]: { stations:
                [
                    {
                        start_station_name: string,
                        start_station_id: string,
                        len: number
                    }
                ],
            days:
                [
                    {
                        weekday:string,
                        day: string,
                        len:number
                    }
                ]
        }
    }
}}) {
    if (!data || !data.stats) return <p>No data available</p>;
    console.log(data)
  
    return (
      <div>
        {Object.keys(data.stats).map((key, i) => (
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
                <h2 key={i} className="text-2xl font-bold text-gray-800 mb-4">Trip Statistics</h2>
                <h3 key={i} className="text-2xl font-bold text-gray-800 mb-4">{key}</h3>
                
                {/* Stations Section */}
                <div key={i} className="mb-6">
                <h3 key={i} className="text-xl font-semibold text-gray-700">Top Stations</h3>
                <ul className="mt-2 space-y-2">
                    {data.stats[key].stations.map((station, index) => (
                    <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                        <p className="text-gray-800 font-medium">Station ID: {station.start_station_id || "Unknown"}</p>
                        <p className="text-gray-500 text-sm">Trips: {station.len}</p>
                    </li>
                    ))}
                </ul>
                </div>
                
                {/* Days Section */}
                <div key={i}>
                <h3 key={i} className="text-xl font-semibold text-gray-700">Top Days</h3>
                <ul key={i} className="mt-2 space-y-2">
                    {data.stats[key].days.map((day, index) => (
                    <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                        <p className="text-gray-800 font-medium">{day.day}</p>
                        <p className="text-gray-500 text-sm">Trips: {day.len}</p>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
		))}	
        
      </div>
    );
  };
export interface IStatsData {
    stats:
        {
            [key: string]: {
                stations: [
                    {
                        start_station_name: string,
                        start_station_id: string,
                        len: number
                    }
                ],
                days: [
                    {
                        weekday:string,
                        day: string,
                        len:number
                    }
                ]
            }
        }
}


export interface IStats {
    data: IStatsData[];
}
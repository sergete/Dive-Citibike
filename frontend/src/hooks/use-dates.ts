import {useQuery, UseQueryResult} from "@tanstack/react-query";
import CONSTANTS from "@/lib/constants"

export function useDates(): UseQueryResult<{[key:string]: string[]}, Error> {
    return useQuery({
        queryKey: ['dates'],
        queryFn: async (): Promise<object> => {
            const url = `${CONSTANTS.API_URL}/dates`
            console.log(url)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Dates retrieval error')
            }
            return response.json()
        },
    })
}

export function useStatsDates(): UseQueryResult<{[key:string]: string[]}, Error> {
    return useQuery({
        queryKey: ['statsDates'],
        queryFn: async (): Promise<object> => {
            const url = `${CONSTANTS.API_URL}/stats/dates`
            console.log(url)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Dates retrieval error')
            }
            return response.json()
        }
    })
}

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import {useEffect, useState} from "react";
import {StatsCard} from "@/components/stats/Card.tsx";
import {IStats} from "@/components/common/interfaces/StatsInterface.ts";

export function StatsCarousel({ statsObject }: { statsObject: IStats }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const splitTest = function (str: string): string {
        let pathname: string | undefined = ""
        if (str != undefined) {
            pathname = str
        }

        const inverseSlash: string | undefined = pathname.split("/").pop()
        if (inverseSlash != undefined && inverseSlash.length > 1) {
            pathname = inverseSlash.split('/').pop()
        }

        return pathname == undefined ? "" : pathname;
    }


    return (
        <div className="mx-auto max-w-xs">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {statsObject.data.map((statsData, arrIndex: number) => (
                        Object.keys(statsData.stats).map((key: string, index: number) => (
                            <CarouselItem key={(arrIndex * statsObject.data.length) + index}>
                                <StatsCard
                                    key = {index}
                                    name={splitTest(key)}
                                    dataStations={statsData.stats[key].stations}
                                    dataDays={statsData.stats[key].days}
                                />
                            </CarouselItem>
                        ))
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
            </div>
        </div>
    )
}

"use client";

import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import {Label} from "@radix-ui/react-label";

export function MonthSelector({ handle, label, items}:{handle: any, label: string, items: string[]}) {
    const handleChange = (item: string): void => {
        handle(item);
    }

    return (
        <div id='selector' className="flex flex-col justify-center items-center mb-6">
            <Label className="font-bold" htmlFor="selector">{ label }</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item, i) => (
                            <SelectItem key={i} value={item}>{item && item === "0" ? "All" : item}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

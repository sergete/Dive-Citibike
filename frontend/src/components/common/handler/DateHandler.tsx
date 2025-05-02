import {DatePicker} from "@/components/common/DatePicker";

export function DateHandler (
    {
        callback,
        status,
        data,
        error,
        buttonDes,
        monthNeeded}:
    {
        callback: any,
        status: string,
        error: any,
        data: {[key: string]: string[]},
        buttonDes: string,
        monthNeeded?: boolean,
    })
{

    return (
        <div>
            {status === 'pending' ? (
                'Loading...'
            ) : status === 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <DatePicker buttonDes={buttonDes}
                                dates={ data }
                                callback={callback}
                                monthNeeded={monthNeeded ?? false}
                    />
                </>
                )}
        </div>
    )
}

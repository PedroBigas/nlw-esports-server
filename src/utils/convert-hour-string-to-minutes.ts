
// 18:00 => ["18", "00"] => [18, 00]

export default function convertHourStringToMinutes(HourString : string){
    const [hour , minutes] = HourString.split(':').map(Number)

    const minutesAmount = (hour * 60) + minutes;

    return minutesAmount
}
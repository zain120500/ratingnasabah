const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des"]
const fullmonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum\'at", "Sabtu"]
const ddMMMYYYY = (date: any) => {
    const newDate = new Date(date)
    const monthNumber = newDate.getMonth()
    const monthText = months[monthNumber]
    const dayNumber = newDate.getDay()
    const dayText = days[dayNumber]
    return `${dayText}, ${newDate.getDate()} ${monthText} ${newDate.getFullYear()}`
}
const pgiHIS = (date: any) => {
    const newDate = new Date(date)
    const H = newDate.getHours()
    const I = newDate.getMinutes()
    const S = newDate.getSeconds()
    return `${H}:${I}:${S}`
}
const pgiFullMonth = (month: any) => {
    const monthText = fullmonths[month]
    return monthText
}
const pgiMonth = (month: any) => {
    const monthText = months[month]
    return monthText
}
const getRangeYear = (startYear = 2020) => {
    const currentYear = new Date().getFullYear();
    const resultArr = [];
    let year = startYear;
    while (year <= currentYear + 1) {
        resultArr.push(year);
        ++year;
    }
    return resultArr;
}
const getRangeFullMonth = () => {
    const x = fullmonths.map((item, index) => {
        return {
            value: index + 1,
            text: item
        }
    })

    return x
}

export {
    ddMMMYYYY,
    pgiHIS,
    pgiFullMonth,
    pgiMonth,
    getRangeYear,
    getRangeFullMonth
}

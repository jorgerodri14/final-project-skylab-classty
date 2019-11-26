module.exports = (stringDate) => {
    const dateArray = stringDate.split('-')
    const day = Number(dateArray[0])
    const month = Number(dateArray[1])
    const year = Number(dateArray[2])
    return new Date(year, month, day).toLocaleDateString()
}
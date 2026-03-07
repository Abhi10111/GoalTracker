export function isModifiedToday(dateString) {
    if (!dateString) return false
    const storedDatePart = dateString.split(",")[0].trim();

    const todayDatePart = new Date().toLocaleDateString("en-IN");

    return storedDatePart === todayDatePart;
}

export function getToday() {
    return (new Date()).toLocaleString('en-IN')
}

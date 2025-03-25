export function formatDateTime(dateString) {
    let date = new Date(dateString);
    let now = new Date();
    let year = date.getFullYear();
    let month = date.toLocaleString('en-US', { month: 'short' }); 
    let day = date.getDate();
    let hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digits
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digits
    // If the year is the current year, omit it
    let showYear = year !== now.getFullYear();
    // Format string based on condition
    return showYear
        ? `${month} ${day}, ${year} @ ${hours}:${minutes}`
        : `${month} ${day} @ ${hours}:${minutes}`;
}

export function formatDoubleToKr(doubleNumber) {
    return new Intl.NumberFormat('de-DE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(doubleNumber);
}

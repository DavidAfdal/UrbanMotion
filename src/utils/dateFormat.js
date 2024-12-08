export const formatDate = (date) => {
    const newDate = new Date(date); // Replace with your date
    const formattedDate = new Intl.DateTimeFormat('en-GB').format(newDate);

    return formattedDate
} 


export const addDays = (date, days)  => {
    const result = new Date(date); // Create a new Date instance to avoid mutating the original date
    result.setDate(result.getDate() + days); // Add the number of days
    return formatDate(result);
  }

export function todaysDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
  }
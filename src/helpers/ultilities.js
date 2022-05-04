export const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

export const handleError = error => {
    // this makes sure that the FAIL output isn't repeated in the case when there's a failure before the timeout
    if (!error.handled) {
        if (error.timedout) {
            console.log("TIMEDOUT", error.timedout);
        } else {
            console.log("FAIL!", error.message);
            error.handled = true;
            throw error;
        }
    }
};



function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // If error is present in query, show the alert
    if (urlParams.has('error')) {
        alert("Incorrect username or password. Please try again.");
    }
}

// Call the function on page load to check for errors
window.onload = getQueryParams;
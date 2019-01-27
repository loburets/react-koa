class RequestHelper {
    static throwIfErrorStatus (response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(`Response error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error
        }
    }
}

export default RequestHelper;
class RestClient {

    constructor(url) {
        this.url = url;
    }
    
    getTask(endpoint) {
        const pro = fetch(this.url+ endpoint)
        const body = pro.then((response) => {
            return response.json()
        })
        return body

    }
}
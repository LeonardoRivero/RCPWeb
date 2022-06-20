function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue)
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

export default class Requests {
    constructor() {
        this.options = {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: null
        }
    }
    async get(url) {
        this.options.method = "GET";
        let response = await this.handleResponse(url)
        return response

    }
    async post(url, data) {
        this.options.method = "POST";
        this.options.body = data;
        let response = await this.handleResponse(url)
        return response

    }
    async put(url, data) {
        this.options.method = "PUT";
        this.options.body = data;
        let response = await this.handleResponse(url)
        return response

    }
    async delete(url) {
        this.options.method = "DELETE";
        let response = await this.handleResponse(url)
        return response

    }
    async handleResponse(url) {
        try {
            console.log(this.options, url)
            let response = await fetch(url, this.options)
            if (response.ok) {
                let responseAsJson = await response.json()
                return responseAsJson
            }
        }
        catch (error) {
            return await error
        }
    }
}

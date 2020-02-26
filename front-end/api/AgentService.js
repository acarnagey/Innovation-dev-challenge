const API_ENDPOINT = 'http://192.168.86.20:3000/api';

class AgentService {
    static getHeaders() {
        return {
            'Content-Type': 'application/json'
        };
    }
    static async get(path) {
        const input = `${API_ENDPOINT}${path}`;
        const headers = await this.getHeaders(path);
        const init = {
            method: 'GET',
            headers
        };
        const response = await fetch(input, init);
        return response.json();
    }

    static async post(path, entity, json = true) {
        let error = null;
        const input = `${API_ENDPOINT}${path}`;
        const headers = await this.getHeaders(path);
        const init = {
            method: 'POST',
            headers,
            body: JSON.stringify(entity)
        };
        const response = await fetch(input, init);
        if (response.ok) {
            return response[response.status === 204 ? "text" : "json"]();
        }
        if (response.status === 422) {
            return response.json().then(err => {
                throw err;
            });
        }
        else {
            error = new Error(response.statusText);
        }
        error.response = response;
        throw error;
    }

    static async login(loginRequest) {
        return (await this.post('/login', loginRequest));
    }

    static async getDocuments(accountId) {
        return (await this.get(`/account/${accountId}/documents`));
    }

    static async getDocumentTypes() {
        return (await this.get('/documenttypes'));
    }
}

export default AgentService;

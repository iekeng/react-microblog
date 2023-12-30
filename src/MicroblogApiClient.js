const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class MicroblogApiClient {
  constructor() {
    this.base_url = BASE_API_URL + '/api';
  }

  async request(options) {
    let query = URLSearchParams(options.query || {}).toString()

    if (query !== ''){
        query = '?' + query
    }

    let response;
    try {
        response = await fetch(this.base_url + options.url + query, {
          method: options.method,
          headers: {
            'Content-Type': 'application/JSON',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : null,
        });

        return {
          ok: response.ok,
          status: response.status,
          body: response.status !== 204 ? await response.json() : null
        };
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error.toString(),
        }; }
      };
    }
  }
  async get(url, query, options){
    return this.request({method:'GET', url, query, ...options})
  }

  async post(url, body, options) {
    this.request({method:'POST', url, body, ...options.})
  }
 
  async put(url, body, options) {
    this.request({method:'PUT', url, body, ...options.})
  }
  
  async delete(url, options) {
    this.request({method:'DELETE', url, ...options.})
  }
}
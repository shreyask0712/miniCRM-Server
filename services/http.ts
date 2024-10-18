export interface HttpConfig {
    baseUrl?: string;
    headers?: Record<string, string>;
}

export interface HttpReq {
    path: string;
    query?: Record<string, string>;
    headers?: Record<string, string>;
}

export interface HttpResp {
    statusCode: string;
    headers: Record<string, string>;
    body: string;
}

export class Http {
    private config: HttpConfig;

    constructor(config: HttpConfig) {
        this.config = config;
    }

    async send(req: HttpReq): Promise<HttpResp> {
        const url = new URL(req.path, this.config.baseUrl);
        if (req.query) {
            Object.entries(req.query).forEach(([key, value]) => url.searchParams.append(key, value));
        }
        
        const response = await fetch(url.toString(), {
            headers: { ...this.config.headers, ...req.headers }
        });
        
        const body = await response.text();
        const headers: Record<string, string> = {};
        
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });
        
        return {
            statusCode: response.status.toString(),
            headers,
            body
        };
    }
}

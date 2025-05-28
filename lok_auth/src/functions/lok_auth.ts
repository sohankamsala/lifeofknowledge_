import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function lok_auth(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${"sigma"}!` };
};

app.http('lok_auth', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: lok_auth
});

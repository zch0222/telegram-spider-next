
import { NextRequest, NextResponse } from 'next/server';

// Helper to copy headers
function copyHeaders(sourceHeaders: Headers, targetHeaders: Headers) {
    sourceHeaders.forEach((value, key) => {
        // Skip some headers that might cause issues or should be reset
        if (key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'connection' && key.toLowerCase() !== 'host') {
             targetHeaders.set(key, value);
        }
    });
}

export async function GET(req: NextRequest) {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
    const targetUrl = `${backendUrl}/task_process`;

    try {
        const headers = new Headers();
        const cookie = req.headers.get('cookie');
        if (cookie) {
            headers.set('cookie', cookie);
        }
        
        const auth = req.headers.get('authorization');
        if (auth) {
            headers.set('authorization', auth);
        }

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: headers,
            cache: 'no-store',
        });

        if (!response.ok) {
            return new NextResponse(`Backend error: ${response.statusText}`, { status: response.status });
        }

        const stream = response.body;

        if (!stream) {
            return new NextResponse('No response body from backend', { status: 500 });
        }

        const newHeaders = new Headers();
        copyHeaders(response.headers, newHeaders);
        
        newHeaders.set('Content-Type', 'text/event-stream');
        newHeaders.set('Cache-Control', 'no-cache, no-transform');
        newHeaders.set('Connection', 'keep-alive');
        newHeaders.set('X-Accel-Buffering', 'no');

        return new NextResponse(stream, {
            status: response.status,
            headers: newHeaders,
        });

    } catch (error: any) {
        console.error('Proxy error:', error);
        return new NextResponse(`Proxy error: ${error.message}`, { status: 500 });
    }
}

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
    const targetUrl = `${backendUrl}/yt-dlp/process`;

    try {
        // Forward the request to the backend
        // We need to forward cookies for authentication
        const headers = new Headers();
        // Copy relevant headers from the original request
        const cookie = req.headers.get('cookie');
        if (cookie) {
            headers.set('cookie', cookie);
        }
        
        // You might want to forward Authorization header if used instead of cookies
        const auth = req.headers.get('authorization');
        if (auth) {
            headers.set('authorization', auth);
        }

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: headers,
            // crucial for streaming
            cache: 'no-store',
            //@ts-ignore - duplex is needed for some node versions but standard fetch doesn't need it for GET usually
            // duplex: 'half' 
        });

        if (!response.ok) {
            return new NextResponse(`Backend error: ${response.statusText}`, { status: response.status });
        }

        // Create a ReadableStream from the backend response body
        // and pipe it to the Next.js response
        const stream = response.body;

        if (!stream) {
            return new NextResponse('No response body from backend', { status: 500 });
        }

        // Return a new response with the stream
        // We must set the correct headers for SSE
        const newHeaders = new Headers();
        copyHeaders(response.headers, newHeaders);
        
        // Ensure SSE headers are set correctly
        newHeaders.set('Content-Type', 'text/event-stream');
        newHeaders.set('Cache-Control', 'no-cache, no-transform');
        newHeaders.set('Connection', 'keep-alive');
        newHeaders.set('X-Accel-Buffering', 'no'); // For Nginx if involved

        return new NextResponse(stream, {
            status: response.status,
            headers: newHeaders,
        });

    } catch (error: any) {
        console.error('Proxy error:', error);
        return new NextResponse(`Proxy error: ${error.message}`, { status: 500 });
    }
}

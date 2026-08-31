import { NextResponse } from 'next/server';
import { getCurrentAdminUser } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentAdminUser();

    const noCacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      Pragma: 'no-cache',
    };

    if (!user || !user.isActive) {
      return NextResponse.json(
        { authenticated: false },
        {
          status: 401,
          headers: noCacheHeaders,
        }
      );
    }

    return NextResponse.json(
      { authenticated: true },
      {
        status: 200,
        headers: noCacheHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
        },
      }
    );
  }
}

import { NextResponse } from 'next/server';
import {
	TOKEN_COOKIE,
	protectedRoutes,
	authRoutes,
} from '@/services/constants';
import { parseToken } from '@/services/utilities';

export function middleware(request) {
	const d = new Date();
	const currentTime = Math.round(d.getTime() / 1000);

	const token = request.cookies.get(TOKEN_COOKIE)?.value || '';
	const parsedToken = parseToken(token);
	const pathname = request.nextUrl.pathname.split('/')[1];

	if (
		protectedRoutes.includes(pathname) &&
		(!parsedToken || (parsedToken && currentTime > parsedToken.exp))
	) {
		// either not logged in or login has expired
		request.cookies.delete(TOKEN_COOKIE);
		const response = NextResponse.redirect(new URL('/login', request.url));
		return response;
	}

	if (
		authRoutes.includes(pathname) &&
		parsedToken &&
		currentTime < parsedToken.exp
	) {
		// logged in and login has not expired
		return NextResponse.redirect(new URL('/', request.url));
	}
}

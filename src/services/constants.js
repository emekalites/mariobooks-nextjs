export const API_URI = `${process.env.NEXT_PUBLIC_API_URI}/v1`;
export const TOKEN_COOKIE = 'mbtoken';
export const limit = 12;
export const paginate = { page: 0, total: 0, size: 0, pages: 0 };
export const protectedRoutes = ['account'];
export const authRoutes = [
	'login',
	'register',
	'forgot-password',
	'reset-password',
	'verify',
];
export const fulldate = 'DD-MMM-YYYY h:mma';

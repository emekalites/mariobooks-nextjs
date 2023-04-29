import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import AppLoading from '@/components/app-loading';
import { request } from '@/services/utilities';
import toast from '@/services/toast';
import { useAuth } from '@/hooks/auth';

const Verify = () => {
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const auth = useAuth();

	const { token } = router.query;

	const verifyAccount = useCallback(
		async token => {
			try {
				setLoading(false);
				const rs = await request(`auth/activate/${token}`);
				auth.login(rs.result);
				toast({ message: 'account activated!', type: 'success' });
				router.push('/');
			} catch (error) {
				console.log(error);
				setLoading(false);
				toast({ message: 'invalid token!', type: 'error' });
				router.push('/404');
			}
		},
		[auth, router]
	);

	useEffect(() => {
		if (loading && token) {
			verifyAccount(token);
		}
	}, [loading, token, verifyAccount]);

	return <AppLoading />;
};

export default Verify;

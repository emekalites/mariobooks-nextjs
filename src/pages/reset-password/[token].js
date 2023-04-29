import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppLoading from '@/components/app-loading';
import { request } from '@/services/utilities';
import toast from '@/services/toast';
import { useAuth } from '@/hooks/auth';
import AppMessage from '@/components/app-message';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { block } from '@/redux/slices/general';

const ResetPassword = () => {
	const [loading, setLoading] = useState(true);
	const [resetData, setResetData] = useState(null);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useAuth();

	const { token } = router.query;

	const verifyToken = useCallback(
		async token => {
			try {
				const rs = await request(`auth/check-token/${token}`);
				setResetData(rs.result.reset);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
				toast({ message: 'invalid token!', type: 'error' });
				router.push('/404');
			}
		},
		[router]
	);

	useEffect(() => {
		if (loading && token) {
			verifyToken(token);
		}
	}, [loading, token, verifyToken]);

	async function onSubmit(data) {
		try {
			console.log(data);
			const { password, password_confirmation } = data;
			if (password !== password_confirmation) {
				setError('password_confirmation', {
					type: 'manual',
					message: 'passwords are not the same',
				});
				return;
			}
			clearErrors('root.serverError');
			dispatch(block(true));
			const config = {
				method: 'POST',
				body: { ...data, token: resetData.token },
			};
			const rs = await request('auth/reset-password', config);
			auth.login(rs.result);
			dispatch(block(false));
			toast({ message: 'password saved!', type: 'success' });
			router.push('/');
		} catch (e) {
			console.log(e);
			const message = e?.message || 'server error!';
			setError('root.serverError', { type: 'custom', message });
			dispatch(block(false));
		}
	}

	return loading && !resetData ? (
		<AppLoading />
	) : (
		<>
			<div className="breadcrumb-area pt-35 pb-35 bg-gray-3">
				<div className="container">
					<div className="breadcrumb-content text-center">
						<ul>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li className="active">Reset Password</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="login-register-area pt-20 pb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 col-md-12 ms-auto me-auto">
							<div className="login-register-wrapper">
								<div className="tab-content">
									<div id="lg1" className="tab-pane active">
										<div className="login-form-container">
											<div className="login-register-form">
												<form onSubmit={handleSubmit(onSubmit)}>
													{errors.root?.serverError?.type === 'custom' && (
														<AppMessage
															message={errors.root.serverError?.message || ''}
															type="error"
														/>
													)}
													<div className="form-group mb-4">
														<label htmlFor="password">Password</label>
														<input
															id="password"
															className={`form-control ${
																errors.password ? 'is-invalid' : ''
															}`}
															{...register('password', { required: true })}
															placeholder="Enter your password"
															type="password"
														/>
														{errors.password && (
															<span className="help-block invalid-feedback">
																enter your password
															</span>
														)}
													</div>
													<div className="form-group mb-5">
														<label htmlFor="password_confirmation">
															Confirm password
														</label>
														<input
															id="password_confirmation"
															className={`form-control ${
																errors.password_confirmation ? 'is-invalid' : ''
															}`}
															{...register('password_confirmation', {
																required: true,
															})}
															placeholder="Re-enter your password"
															type="password"
														/>
														{errors.password_confirmation && (
															<span className="help-block invalid-feedback">
																passwords are not the same
															</span>
														)}
													</div>
													<div className="button-box">
														<button type="submit">
															<span>Save</span>
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;

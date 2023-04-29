import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { block } from '@/redux/slices/general';
import { request } from '@/services/utilities';
import AppMessage from '@/components/app-message';
import toast from '@/services/toast';

const ChangePassword = ({ user }) => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
		reset,
	} = useForm();

	const dispatch = useDispatch();

	async function onSubmit(data) {
		try {
			const { password, confirm_password } = data;
			if (password !== confirm_password) {
				setError('confirm_password', {
					type: 'manual',
					message: 'passwords are not the same',
				});
				return;
			}
			clearErrors('root.serverError');
			dispatch(block(true));
			const config = {
				method: 'POST',
				body: {
					...data,
					password_confirmation: confirm_password,
					confirm_password: undefined,
				},
			};
			await request(`users/${user.id}/change-password`, config);
			dispatch(block(false));
			reset();
			toast({ message: 'password changed!', type: 'success' });
		} catch (e) {
			console.log(e);
			const message = e?.message || 'server error!';
			setError('root.serverError', { type: 'custom', message });
			dispatch(block(false));
		}
	}

	return (
		<div className="discount-code">
			<form className="settings" onSubmit={handleSubmit(onSubmit)}>
				{errors.root?.serverError?.type === 'custom' && (
					<AppMessage
						message={errors.root.serverError?.message || ''}
						type="error"
					/>
				)}
				<div className="form-group mb-4">
					<label htmlFor="current_password">Current Password</label>
					<input
						id="current_password"
						className={`form-control ${
							errors.current_password ? 'is-invalid' : ''
						}`}
						{...register('current_password', { required: true })}
						placeholder="Enter your current password"
						type="password"
					/>
					{errors.current_password && (
						<span className="help-block invalid-feedback">
							enter your current password
						</span>
					)}
				</div>
				<div className="form-group mb-4">
					<label htmlFor="password">New Password</label>
					<input
						id="password"
						className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
					<label htmlFor="confirm_password">Confirm password</label>
					<input
						id="confirmPassword"
						className={`form-control ${
							errors.confirm_password ? 'is-invalid' : ''
						}`}
						{...register('confirm_password', { required: true })}
						placeholder="Re-enter your password"
						type="password"
					/>
					{errors.confirm_password && (
						<span className="help-block invalid-feedback">
							passwords are not the same
						</span>
					)}
				</div>
				<div className="text-center">
					<button className="cart-btn-2" type="submit">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;

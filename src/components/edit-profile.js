import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { block } from '@/redux/slices/general';
import { request } from '@/services/utilities';
import AppMessage from '@/components/app-message';
import { setUser } from '@/redux/slices/user';
import toast from '@/services/toast';

const EditProfile = ({ user }) => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			address: user?.address || '',
		},
	});

	const dispatch = useDispatch();

	async function onSubmit(data) {
		try {
			clearErrors('root.serverError');
			dispatch(block(true));
			const config = {
				method: 'PUT',
				body: { ...data, current_email: user?.email || '' },
			};
			const rs = await request(`users/${user.id}`, config);
			dispatch(setUser(rs.result));
			dispatch(block(false));
			toast({ message: 'profile saved!', type: 'success' });
		} catch (e) {
			console.log(e);
			const message = e?.message || 'server error!';
			setError('root.serverError', { type: 'custom', message });
			dispatch(block(false));
		}
	}

	return (
		<div className="tax-wrapper">
			<form className="settings" onSubmit={handleSubmit(onSubmit)}>
				{errors.root?.serverError?.type === 'custom' && (
					<AppMessage
						message={errors.root.serverError?.message || ''}
						type="error"
					/>
				)}
				<div className="form-group mb-4">
					<label htmlFor="name">Name</label>
					<input
						id="name"
						className={`form-control ${errors.name ? 'is-invalid' : ''}`}
						{...register('name', { required: true })}
						placeholder="Enter your name"
						type="text"
					/>
					{errors.name && (
						<span className="help-block invalid-feedback">enter your name</span>
					)}
				</div>
				<div className="form-group mb-4">
					<label htmlFor="email">Email address</label>
					<input
						id="email"
						className={`form-control ${errors.email ? 'is-invalid' : ''}`}
						{...register('email', { required: true })}
						placeholder="Enter your email address"
						type="text"
					/>
					{errors.email && (
						<span className="help-block invalid-feedback">
							enter your email address
						</span>
					)}
				</div>
				<div className="form-group mb-4">
					<label htmlFor="address">Address</label>
					<input
						id="address"
						className={`form-control ${errors.address ? 'is-invalid' : ''}`}
						{...register('address', { required: true })}
						placeholder="Enter your address"
						type="text"
					/>
					{errors.address && (
						<span className="help-block invalid-feedback">
							enter your address
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

export default EditProfile;

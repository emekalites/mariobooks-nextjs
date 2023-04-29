import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/auth';
import EditProfile from '@/components/edit-profile';
import ChangePassword from '@/components/change-password';
import { block } from '@/redux/slices/general';
import toast from '@/services/toast';
import { request } from '@/services/utilities';

const Settings = () => {
	const { user } = useAuth();

	const dispatch = useDispatch();

	const resendEmail = async () => {
		try {
			dispatch(block(true));
			const config = { method: 'POST', body: { email: user.email } };
			await request('auth/resend-verify', config);
			dispatch(block(false));
			toast({ message: 'email sent!', type: 'success' });
		} catch (e) {
			console.log(e);
			const message = e?.message || 'server error!';
			toast({ message: 'email sent!', type: 'danger' });
			dispatch(block(false));
		}
	};

	return (
		<div className="cart-main-area">
			<div className="container">
				{!user.email_verified_at && (
					<div className="row">
						<div className="col-lg-9 ms-auto me-auto">
							<div className="alert alert-danger d-flex align-items-center justify-content-center">
								<div>Your email address is not verified</div>
								<button
									className="btn btn-danger btn-sm d-block ms-4"
									type="button"
									onClick={() => resendEmail()}
								>
									Resend Email
								</button>
							</div>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-lg-9 ms-auto me-auto">
						<div className="row">
							<div className="col-md-6">
								<div className="cart-tax">
									<div className="title-wrap">
										<h4 className="cart-bottom-title section-bg-gray">
											Edit Profile
										</h4>
									</div>
									<EditProfile user={user} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="discount-code-wrapper">
									<div className="title-wrap">
										<h4 className="cart-bottom-title section-bg-gray">
											Change Password
										</h4>
									</div>
									<ChangePassword user={user} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;

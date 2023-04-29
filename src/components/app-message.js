import React from 'react';

const AppMessage = ({ type, message, shouldResend, resendEmail }) => {
	let alertClass = '';

	switch (type) {
		case 'warning':
			alertClass = 'alert-warning';
			break;
		case 'info':
			alertClass = 'alert-info';
			break;
		case 'error':
			alertClass = 'alert-danger';
			break;
		case 'success':
		default:
			alertClass = 'alert-success';
			break;
	}

	return (
		message !== '' && (
			<div className={`alert ${alertClass}`}>
				{type === 'error' && <strong>Error! </strong>}
				{message}
				{shouldResend && (
					<button
						className="btn btn-danger btn-sm d-block mt-2"
						type="button"
						onClick={() => resendEmail()}
					>
						Resend Email
					</button>
				)}
			</div>
		)
	);
};

export default AppMessage;

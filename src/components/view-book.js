/* eslint-disable @next/next/no-img-element */
import { useSelector } from 'react-redux';
import { formatCurrency } from '@/services/utilities';

const ViewBook = ({ book, addToCart, removeFromCart, closeModal }) => {
	const cart = useSelector((state) => state.cart);

	const inCart = cart.items.find((c) => c.id === book.id);

	return (
		<div
			className="modal fade animated show"
			tabIndex="-1"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={() => closeModal()}
						></button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-md-5 col-sm-12 col-xs-12">
								<div className="tab-content quickview-big-img">
									<div id="pro-1" className="tab-pane fade show active">
										<img src={book.cover} alt="" />
									</div>
								</div>
							</div>
							<div className="col-md-7 col-sm-12 col-xs-12">
								<div className="product-details-content quickview-content">
									<h2 className="text-underline">{book.name}</h2>
									<div className="product-details-price">
										<span className="current-price">
											{formatCurrency(book.amount)}
										</span>
									</div>
									<p v-html="book.excerpt"></p>
									{!inCart ? (
										<div className="pro-details-quality">
											<div className="pro-details-cart btn-success">
												<a className="pointer" onClick={() => addToCart(book)}>
													Add To Cart
												</a>
											</div>
										</div>
									) : (
										<div className="pro-details-quality">
											<div className="pro-details-cart btn-danger">
												<a
													className="pointer"
													onClick={() => removeFromCart(book)}
												>
													Remove From Cart
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewBook;

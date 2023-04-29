/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { limit, paginate } from '@/services/constants';
import { formatDate, formatCurrency, request } from '@/services/utilities';

const Purchases = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [meta, setMeta] = useState(paginate);

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

	const fetchTransactions = useCallback(
		async page => {
			try {
				const p = page || 1;
				const rs = await request(
					`transactions?page_size=${limit}&page=${p}&user_id=${user.id}`
				);
				const { list, ...meta } = rs.result;
				setMeta(meta);
				setTransactions(list);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		},
		[user.id]
	);

	useEffect(() => {
		if (loading) {
			fetchTransactions();
		}
	}, [fetchTransactions, loading]);

	const onNavigatePage = async nextPage => {
		setLoading(true);
		await fetchTransactions(nextPage);
	};

	return (
		<div className="cart-main-area">
			<div className="container">
				<div className="row">
					{!loading && (
						<div className="col-lg-12 col-md-12 col-sm-12 col-12">
							<div className="table-content table-responsive cart-table-content">
								<table className="table">
									<thead>
										<tr>
											<th>Order #</th>
											<th>Book</th>
											<th>Name</th>
											<th>Item #</th>
											<th>Amount</th>
											<th>Status</th>
											<th>Date</th>
											<th>Invoice</th>
										</tr>
									</thead>
									<tbody>
										{transactions.map((item, i) => (
											<tr key={i}>
												<td>{item.uuid}</td>
												<td className="product-thumbnail">
													<a>
														<img src={item.book.cover} alt="" />
													</a>
												</td>
												<td className="product-name">{item.book.name}</td>
												<td>{item.book.uuid}</td>
												<td>{formatCurrency(item.book.amount)}</td>
												<td>
													{item.approved === 0 && (
														<span className="badge bg-warning">pending</span>
													)}
													{item.approved === 1 && (
														<span className="badge bg-success">paid</span>
													)}
													{item.approved === -1 && (
														<span className="badge bg-danger">cancelled</span>
													)}
												</td>
												<td>
													{formatDate(item.created_at, 'D MMM, YYYY h:mma')}
												</td>
												{item.approved === 1 ? (
													<td className="product-wishlist-cart">
														<Link
															href={`${process.env.NEXT_PUBLIC_API_URI}/transactions/invoice/${item.uuid}`}
															passHref={true}
															target="_blank"
														>
															Invoice
														</Link>
													</td>
												) : (
													<td>
														<a>--</a>
													</td>
												)}
											</tr>
										))}
										{transactions.length === 0 && (
											<tr>
												<td colSpan="8">
													<div className="alert alert-info mb-0">
														No purchase history found!
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Purchases;

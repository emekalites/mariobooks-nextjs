import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { limit, paginate } from '@/services/constants';
import { formatDate, request } from '@/services/utilities';

const Downloads = () => {
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
					`transactions?page_size=${limit}&page=${p}&user_id=${user.id}&approved=1`
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
											<th>Item #</th>
											<th>Item</th>
											<th>Category</th>
											<th>Date</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{transactions.map((item, i) => (
											<tr key={i}>
												<td>{item.book.uuid}</td>
												<td className="product-name">{item.book.name}</td>
												<td>{item.book.category.name}</td>
												<td>
													{formatDate(item.created_at, 'D MMM, YYYY h:mma')}
												</td>
												<td className="product-wishlist-cart">
													<Link
														href={`${process.env.NEXT_PUBLIC_API_URI}/book/3/${item.book.uuid}.pdf?order=${item.uuid}`}
														passHref={true}
														target="_blank"
													>
														download
													</Link>
												</td>
											</tr>
										))}
										{transactions.length === 0 && (
											<tr>
												<td colSpan="5">
													<div className="alert alert-info mb-0">
														No books found!
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

export default Downloads;

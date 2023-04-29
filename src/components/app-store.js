/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from '@/components/app-pagination';
import ViewBook from '@/components/view-book';
import toast from '@/services/toast';
import { limit, paginate } from '@/services/constants';
import { formatCurrency, request } from '@/services/utilities';
import { add, remove } from '@/redux/slices/cart';

const AppStore = ({ categories, category }) => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [meta, setMeta] = useState(paginate);
	const [currentCategory, setCurrentCategory] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [book, setBook] = useState(null);

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const fetchBooks = useCallback(async (category, page) => {
		try {
			setLoading(true);
			const p = page || 1;
			const rs = await request(
				`books?page_size=${limit}&page=${p}&category=${category}`
			);
			const { list, ...meta } = rs.result;
			setMeta(meta);
			setBooks(list);
			setCurrentCategory(category);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setCurrentCategory(category);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (currentCategory !== category) {
			fetchBooks(category);
		}
	}, [category, currentCategory, fetchBooks]);

	const onNavigatePage = async (nextPage) => {
		setWorking(true);
		await fetchBooks(category, nextPage);
	};

	const showBook = (item) => {
		document.body.classList.add('modal-open');
		setBook(item);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setBook(null);
		document.body.classList.remove('modal-open');
	};

	const addToCart = (item) => {
		const _item = cart.items.find((c) => c.id === item.id);
		if (!_item) {
			dispatch(add(item));
			toast({ type: 'success', message: 'item added to cart' });
		} else {
			toast({ type: 'info', message: 'item already in cart' });
		}

		const cartContent = document.getElementsByClassName(
			'shopping-cart-content'
		)[0];
		setTimeout(() => {
			const defaultBtn = document.getElementsByClassName('default-btn')[0];
			defaultBtn.addEventListener('click', function () {
				cartContent.classList.remove('cart-visible');
			});
		}, 2000);
	};

	const removeFromCart = (item) => {
		const _item = cart.items.find((c) => c.id === item.id);
		if (_item) {
			dispatch(remove(item));
			toast({ type: 'success', message: 'item removed from cart' });
		}
	};

	return (
		<div id="store" className="product-area mt-40">
			<div className="container">
				<div className="section-title-5 text-center">
					<h2>Book Store</h2>
				</div>
				<div className="product-tab-list nav pt-35 pb-60 product-tab-pink2 text-center">
					{categories.map((item, i) => (
						<Link
							key={i}
							href={`/${item.slug}#store`}
							className={currentCategory === item.slug ? 'active' : ''}
						>
							<h4>{item.name}</h4>
						</Link>
					))}
				</div>
				{!loading ? (
					<div className="tab-content jump">
						<div className="tab-pane active">
							<div className="row item-wrapper">
								{books.map((item, i) => (
									<div key={i} className="col-xl-3 col-md-6 col-lg-4 col-sm-6">
										<div className="product-wrap-2 mb-25">
											<div className="product-img">
												<a onClick={() => showBook(item)}>
													<img
														className="default-img"
														src={item.cover}
														alt=""
													/>
													<img className="hover-img" src={item.cover} alt="" />
												</a>
											</div>
											<div className="product-content-2">
												<div className="title-price-wrap-2">
													<h3>
														<a onClick={() => showBook(item)}>{item.name}</a>
													</h3>
													<div className="price-2">
														<span>{formatCurrency(item.amount)}</span>
													</div>
												</div>
												<div className="pro-wishlist-2">
													<a
														title="Add to Cart"
														onClick={() => addToCart(item)}
													>
														<i className="fa fa-shopping-cart"></i>
													</a>
												</div>
											</div>
										</div>
									</div>
								))}
								{books.length === 0 && !loading && (
									<div className="col-lg-12 d-block">
										<div className="alert alert-info text-center">
											No Books Found!
										</div>
									</div>
								)}
							</div>
						</div>
						<AppPagination meta={meta} onNavigatePage={onNavigatePage} />
					</div>
				) : (
					<div className="loader mt-20" style={{ height: '200px' }}>
						<div data-loader="dual-ring"></div>
					</div>
				)}
			</div>
			{showModal && (
				<ViewBook
					book={book}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
					closeModal={closeModal}
				/>
			)}
		</div>
	);
};

export default AppStore;

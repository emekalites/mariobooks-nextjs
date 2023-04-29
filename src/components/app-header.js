/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Script from 'next/script';
import { useAuth } from '@/hooks/auth';
import { formatCurrency, reference, request } from '@/services/utilities';
import { remove } from '@/redux/slices/cart';
import toast from '@/services/toast';
import logo from '../assets/img/logo/logo.png';

const AppHeader = () => {
	const router = useRouter();

	const { user, logout } = useAuth();

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const removeFromCart = (item) => dispatch(remove(item));

	const checkout = async () => {
		try {
			const body = {
				items: cart.items.map((c) => ({ id: c.id })),
				reference: reference(),
				channel: 'bank-transfer',
			};
			const config = { method: 'POST', body };
			dispatch(block(true));
			await request(transactions, config);
			dispatch(block(false));
			dispatch(clear());
			toast({
				type: 'success',
				message: 'Order Sent! Thanks for buying from us',
			});
			const el = document.getElementsByClassName('shopping-cart-content');
			el.classList.remove('cart-visible');
			router.push('/account/purchases');
		} catch (e) {
			console.log(e);
			dispatch(block(false));
			toast({
				type: 'error',
				message: e.response?._data?.message || 'error, failed!',
			});
		}
	};

	return (
		<>
			<header className="header-area clearfix header-hm9 transparent-bar">
				<div className="container">
					<div className="header-top-area header-top-border17">
						<div className="row">
							<div className="col-lg-5 col-md-8 col-12">
								<div className="language-currency-wrap">
									<div className="same-language-currency use-style">
										<a href="#">
											NGN <i className="fa fa-angle-down"></i>
										</a>
										<div className="lang-car-dropdown">
											<ul>
												<li>
													<a className="item" href="#">
														Naira (NGN){' '}
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="same-language-currency">
										<p>Whatsapp Us 09161902116</p>
									</div>
								</div>
							</div>
							<div className="col-lg-2 d-none d-lg-block">
								<div className="logo-hm9 text-center">
									<Link href="/">
										<Image alt="" src={logo} />
									</Link>
								</div>
							</div>
							<div className="col-lg-5 col-md-4 col-12">
								<div className="header-right-wrap">
									<div className="same-style account-satting">
										<a className="account-satting-active">
											<i className="pe-7s-user-female"></i>
										</a>
										<div className="account-dropdown">
											<ul>
												{!user ? (
													<>
														<li>
															<Link className="item" href="/login">
																Login
															</Link>
														</li>
														<li>
															<Link className="item" href="/register">
																Register
															</Link>
														</li>
													</>
												) : (
													<>
														<li>
															<Link className="item" href="/account/settings">
																My Account
															</Link>
														</li>
														<li>
															<a
																className="item pointer"
																onClick={() =>
																	logout(() => router.push('/login'))
																}
															>
																Logout
															</a>
														</li>
													</>
												)}
											</ul>
										</div>
									</div>
									<div className="same-style header-wishlist">
										<a>
											<i className="pe-7s-like"></i>
										</a>
									</div>
									<div className="same-style cart-wrap">
										<button className="icon-cart">
											<i className="pe-7s-shopbag"></i>
											<span className="count-style">{cart.items.length}</span>
										</button>
										<div className="shopping-cart-content">
											<ul>
												{cart.items.map((item, i) => (
													<li key={i} className="single-shopping-cart">
														<div className="shopping-cart-img">
															<a>
																<img alt="" src={item.cover} />
															</a>
														</div>
														<div className="shopping-cart-title">
															<h4>
																<a>{item.name}</a>
															</h4>
															<h6>Qty: 1</h6>
															<span>{formatCurrency(item.amount)}</span>
														</div>
														<div className="shopping-cart-delete">
															<a onClick={() => removeFromCart(item)}>
																<i className="fa fa-times-circle"></i>
															</a>
														</div>
													</li>
												))}
												{cart.items.length === 0 && (
													<li className="single-shopping-cart">
														<div className="shopping-cart-title">
															<h6>No items in cart!</h6>
														</div>
													</li>
												)}
											</ul>
											{cart.items.length > 0 && (
												<>
													<div className="shopping-cart-total">
														<h4>
															Total :
															<span className="shop-total">
																{formatCurrency(cart.total)}
															</span>
														</h4>
													</div>
													<div className="payment-method">
														<div className="payment-accordion element-mrg">
															<div id="accordion" className="panel-group">
																<div className="panel payment-accordion">
																	<div
																		id="method-one"
																		className="panel-heading"
																	>
																		<h4 className="panel-title">
																			<a
																				data-bs-toggle="collapse"
																				href="#method1"
																			>
																				Payment Method: Bank Transfer
																			</a>
																		</h4>
																	</div>
																	<div
																		id="method1"
																		className="panel-collapse collapse show"
																		data-bs-parent="#accordion"
																	>
																		<div className="panel-body">
																			<p className="mb-0">
																				Please send a transfer to the following
																				bank account:
																			</p>
																			<p className="mb-0">
																				Bank Name: United Bank for Africa (UBA)
																			</p>
																			<p>Account Number: 2213744579</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="shopping-cart-btn btn-hover text-center">
														{user ? (
															<a
																className="default-btn"
																onClick={() => checkout()}
															>
																place order
															</a>
														) : (
															<Link className="default-btn" href="/login">
																place order
															</Link>
														)}
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-bottom sticky-bar header-res-padding header-padding-2">
					<div className="container">
						<div className="row">
							<div className="col-12 d-block d-lg-none">
								<div className="logo">
									<Link href="/">
										<Image alt="" src={logo} />
									</Link>
								</div>
							</div>
							<div className="col-xl-12 col-lg-12 d-none d-lg-block">
								<div className="main-menu">
									<nav>
										<ul>
											<li>
												<Link href="/">Home</Link>
											</li>
											<li>
												<Link href="/#store">Books</Link>
											</li>
											<li>
												<Link href="/#about"> About Author</Link>
											</li>
											<li>
												<Link href="/#contact"> Contact</Link>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
						<div className="mobile-menu-area">
							<div className="mobile-menu">
								<nav id="mobile-menu-active">
									<ul className="menu-overflow">
										<li>
											<Link href="/">Home</Link>
										</li>
										<li>
											<Link href="/store">Books</Link>
										</li>
										<li>
											<Link href="/about"> About Author</Link>
										</li>
										<li>
											<Link href="/contact"> Contact</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
			<Script id="onmount" strategy="afterInteractive">
				{`
				const cartContent = document.getElementsByClassName('shopping-cart-content')[0];
				const account = document.getElementsByClassName('account-satting-active')[0];
				const actDropdown = document.getElementsByClassName('account-dropdown')[0];
				
				account.addEventListener('click', function () {
					if (cartContent.classList.contains('cart-visible')) {
						cartContent.classList.remove('cart-visible');
					}
				
					if (actDropdown.classList.contains('d-block')) {
						actDropdown.classList.remove('d-block');
					} else {
						actDropdown.classList.add('d-block');
					}
				});
				
				const aList = document.querySelectorAll(
					'.account-dropdown li, .account-dropdown a.item'
				);
				for (let i = 0; i < aList.length; i++) {
					aList[i].addEventListener('click', function () {
						actDropdown.classList.remove('d-block');
					});
				}
				
				const cartDropdown = document.getElementsByClassName('icon-cart')[0];
				cartDropdown.addEventListener('click', function () {
					actDropdown.classList.remove('d-block');
				
					if (cartContent.classList.contains('cart-visible')) {
						cartContent.classList.remove('cart-visible');
					} else {
						cartContent.classList.add('cart-visible');
					}
				});			
				`}
			</Script>
		</>
	);
};

export default AppHeader;

/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="mario books" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/css/bootstrap.min.css" />
				<link rel="stylesheet" href="/css/icons.min.css" />
				<link rel="stylesheet" href="/css/plugins.css" />
				<Script
					src="/js/vendor/modernizr-3.11.7.min.js"
					strategy="afterInteractive"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

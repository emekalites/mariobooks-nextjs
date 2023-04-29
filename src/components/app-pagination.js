import ReactPaginate from 'react-paginate';

const AppPagination = ({ meta, onNavigatePage, direction = 'center' }) => {
	return (
		meta &&
		meta.pages > 0 && (
			<nav className="mt-2">
				<ReactPaginate
					forcePage={meta.page - 1}
					pageCount={meta.pages}
					pageRangeDisplayed={3}
					onPageChange={(item) => onNavigatePage(item.selected + 1)}
					className={`pagination justify-content-${direction}`}
					pageClassName="page-item"
					previousClassName="page-item"
					nextClassName="page-item"
					breakClassName="page-item"
					pageLinkClassName="page-link"
					previousLinkClassName="page-link"
					nextLinkClassName="page-link"
					breakLinkClassName="page-link"
					activeClassName="active"
					renderOnZeroPageCount={null}
				/>
			</nav>
		)
	);
};

export default AppPagination;

import React, { useEffect, useState, useRef } from 'react';
import { TVShow } from './components/TVShow';

import { getData } from './getData';

// API
import { discoverAPI, searchAPI } from './components/API';

function App() {
	const [tvshows, setTVshows] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	let [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(1);

	async function fetchData(api, query) {
		const res = await fetch(api + query);
		const data = await res.json();
		setTVshows(data.results);
		setLoading(false);
	}

	// useEffect(() => {
	//   fetchData(discoverAPI, pageNumber);
	// }, [discoverAPI, pageNumber]);

	// let totalPages;

	useEffect(() => {
		const getShows = async () => {
			const newShows = await getData(discoverAPI, pageNumber);
			setTVshows(prev => [...prev, ...newShows.results]);
			setLoading(true);
			setTotalPages(newShows.total_pages);
		};
		getShows();
	}, [pageNumber]);

	const pageEnd = useRef();
	let num = 1;
	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				entries => {
					if (entries[0].isIntersecting) {
						num++;
						loadMore();
						if (num >= totalPages) {
							observer.unobserve(pageEnd.current);
						}
					}
				},
				{ threshold: 1 }
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, num, totalPages]);

	const loadMore = () => {
		setPageNumber(prevPageNumber => prevPageNumber + 1);
	};

	const handledOnSubmit = e => {
		pageNumber = 1;
		e.preventDefault();
		if (searchTerm !== '') {
			fetchData(searchAPI, searchTerm);
			console.log(pageNumber);
			console.log(loading);
		} else {
			fetchData(discoverAPI, pageNumber);
			console.log(pageNumber);
			console.log(loading);
		}
	};

	const handledOnChange = e => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			<header>
				<form onSubmit={handledOnSubmit}>
					<input
						className="search"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={handledOnChange}
					/>
				</form>
			</header>
			<div className="tvshow-container">
				{tvshows.length > 0 &&
					tvshows.map(tvshow => <TVShow key={tvshow.id} {...tvshow} />)}
			</div>
			<div className="lds-ellipsis" onClick={loadMore} ref={pageEnd}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default App;

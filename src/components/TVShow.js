import React from 'react';
import { imgAPI } from './API';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import posterNA from '../images/posterNotAvailable.png';

export const setVote = vote => {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
};

export const decimalVote = vote => {
	if (Number.isInteger(vote)) {
		return vote + '.0';
	} else {
		return vote;
	}
};

export const TVShow = ({ name, overview, poster_path, vote_average }) => (
	<div className="tvshow">
		<LazyLoadImage
			src={poster_path ? imgAPI + poster_path : posterNA}
			effect="blur"
			placeholderSrc={posterNA}
			delayMethod="debounce"
			delayTime={10000}
			alt={name}
		/>
		<div className="tvshow-info">
			<h3>{name}</h3>
			<span className={`tag ${setVote(vote_average)}`}>
				{`${decimalVote(vote_average)}`}
			</span>
		</div>
		<div className="tvshow-overview">
			<h2>Overview</h2>
			<p>{overview}</p>
		</div>
	</div>
);

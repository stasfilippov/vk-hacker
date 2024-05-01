import {FC, useEffect, useState} from 'react';

export const StoriesContainer: FC = () => {

	const [storyIds, setStoryIds] = useState([])


	useEffect(() => {
		setStoryIds([])
	}, []);

	return (
		<div>
			{storyIds}
		</div>
	);
};


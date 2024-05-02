import {FC, useEffect, useState} from 'react';
import {CommentType, hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {TreeOfComments} from '../../containers/TreeOfComments/TreeOfComments.tsx';

type TreeNodeCommentProps = {
	commentID: number
}
export const TreeNodeComment:FC<TreeNodeCommentProps> = ({ commentID }) => {
	const [showChildren, setShowChildren] = useState(false)
	const [commentCurrent, setCommentCurrent] = useState<CommentType>()

	useEffect(() => {
		async function fetchCommentById () {
			const res = await hackerNewsAPI.getCommentById(commentID)
			setCommentCurrent(res)
		}

		fetchCommentById()
		//получение каждого коммента
		// если у res есть
	}, [])

	const handleClick = () => {
		setShowChildren(!showChildren)
	}

	return (
		<div>
			<div onClick={handleClick}>
				<span>{commentCurrent?.text}</span>
			</div>
			<ul>
				{showChildren && commentCurrent?.kids?.length && <TreeOfComments arrKids={commentCurrent.kids}/>}
			</ul>
		</div>
	);
};


import {FC, useEffect, useState} from 'react';
import {CommentType, hackerNewsAPI} from '../../api/hackerNewsAPI.ts';
import {TreeOfComments} from '../../containers/TreeOfComments/TreeOfComments.tsx';
import {Caption, Div, Footnote, Tappable} from '@vkontakte/vkui';
import style from './treeNodeComment.module.css'

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
		<li className={style.listStyle}>
			{commentCurrent?.text
				?
					<Tappable onClick={handleClick}>
						<Div>
							<Caption level="3">{commentCurrent.by}</Caption>
							<Footnote>{commentCurrent?.text}</Footnote>
						</Div>
					</Tappable>
				: null
			}
			<div>
				{showChildren && commentCurrent?.kids?.length && <TreeOfComments arrKids={commentCurrent.kids}/>}
			</div>
		</li>
	);
};


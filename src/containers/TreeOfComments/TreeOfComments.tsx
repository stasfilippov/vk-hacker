import {FC} from 'react';
import {TreeNodeComment} from '../../components/TreeNodeComment/TreeNodeComment.tsx';
import style from './treeOfComments.module.css'

type TreeOfCommentsProps = {
	arrKids: number[]
}
export const TreeOfComments:FC<TreeOfCommentsProps> = ({ arrKids }) => {
	return (
		<ul className={style.wrapper}>
			{arrKids.map(k => {
				return (
					<TreeNodeComment key={k} commentID={k} />
				)
			})}
		</ul>
	);
};


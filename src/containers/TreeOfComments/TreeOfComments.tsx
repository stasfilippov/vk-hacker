import {FC} from 'react';
import {TreeNodeComment} from '../../components/TreeNodeComment/TreeNodeComment.tsx';

type TreeOfCommentsProps = {
	arrKids: number[]
}
export const TreeOfComments:FC<TreeOfCommentsProps> = ({ arrKids }) => {
	return (
		<ul>
			{arrKids.map(k => {
				return (
					<TreeNodeComment key={k} commentID={k} />
				)
			})}
		</ul>
	);
};


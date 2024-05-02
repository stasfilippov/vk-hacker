import  {FC} from 'react';
import {Separator, Spacing} from '@vkontakte/vkui';
import {StoryItemList} from '../../components/StoryItemList/StoryItemList.tsx';

type StoryItemListContainerProps = {
	idStory: number
}

export const StoryItemListContainer: FC<StoryItemListContainerProps> = ({idStory}) => {
	return (
		<>
			<StoryItemList idStory={idStory}/>
			<Spacing size={24}>
				<Separator/>
			</Spacing>
		</>
	);
};


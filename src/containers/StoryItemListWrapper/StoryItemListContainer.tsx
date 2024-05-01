import {FC} from 'react';
import {StoryItemList} from '../../components/Story/StoryItemList.tsx';
import {Separator, Spacing} from '@vkontakte/vkui';

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


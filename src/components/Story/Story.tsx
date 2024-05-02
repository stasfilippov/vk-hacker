import {FC, useState} from 'react';
import {Button, ButtonGroup, Counter, Group, Header, Link, SimpleCell, Spacing, Title} from '@vkontakte/vkui';
import {
	Icon20CalendarOutline,
	Icon20Chain,
	Icon20CommentOutline,
	Icon20RefreshOutline,
	Icon20User
} from '@vkontakte/icons';
import {StoryType} from '../../api/hackerNewsAPI.ts';
import {convertDate} from '../../utils/convertDate.ts';
import {TreeOfComments} from '../../containers/TreeOfComments/TreeOfComments.tsx';
import {useAppDispatch} from '../../app/store.ts';
import {fetchCurrentStory} from './story-slice.ts';

type StoryProps = {
	story: StoryType
}
export const Story:FC<StoryProps> = ({story}) => {
	const [isOpen, setIsOpen] = useState(true)
	const dateOfStory = convertDate(story?.time)
const dispatch = useAppDispatch()
	const handlerCloseOnClick = () => {
		setIsOpen(!isOpen)
	}
	const handlerRefreshFetchData = () => {
		dispatch(fetchCurrentStory(story.id))
	}

	return (
		<Group header={<Header mode="secondary">Story</Header>}>
			<Title level={'1'}>{story?.title}</Title>
			<Spacing size={16}/>
			<SimpleCell
				expandable="auto"
				before={<Icon20Chain/>}
			>
				<Link href={story?.url}>{story?.url}</Link>
			</SimpleCell>
			<SimpleCell
				expandable="auto"
				before={<Icon20User/>}
			>{story?.by}</SimpleCell>
			<SimpleCell
				expandable="auto"
				before={<Icon20CalendarOutline/>}
			>{dateOfStory}</SimpleCell>
			<SimpleCell
				before={<Icon20CommentOutline/>}
			>
				<ButtonGroup>
					<Button onClick={handlerCloseOnClick} mode="primary" size="m" after={<Counter>{story?.descendants}</Counter>}>
						Комментарии
					</Button>
					<Button size="m" onClick={handlerRefreshFetchData}>
						<Icon20RefreshOutline/>
					</Button>
				</ButtonGroup>
			</SimpleCell>
			{story.kids && isOpen && <TreeOfComments arrKids={story.kids}/>}
		</Group>
	);
};

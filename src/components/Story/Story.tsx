import {FC, useState} from 'react';
import {Button, Counter, Div, Link, SimpleCell, Spacing, Title, VisuallyHidden} from '@vkontakte/vkui';
import {Icon20CalendarOutline, Icon20Chain, Icon20CommentOutline, Icon20User} from '@vkontakte/icons';
import {StoryType} from '../../api/hackerNewsAPI.ts';
import {convertDate} from '../../utils/convertDate.ts';
import {TreeOfComments} from '../../containers/TreeOfComments/TreeOfComments.tsx';

type StoryProps = {
	story: StoryType
}
export const Story:FC<StoryProps> = ({story}) => {
	const [isOpen, setIsOpen] = useState(true)
	const dateOfStory = convertDate(story?.time)

	const handlerOnClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<Div>
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
				<Button onClick={handlerOnClick} mode="primary" size="m" after={<Counter>{story?.descendants}</Counter>}>
					Комментарии
				</Button>
			</SimpleCell>
			{story.kids && isOpen && <TreeOfComments arrKids={story.kids}/>}
			<div>Кнопка для обновления комментариев</div>
		</Div>
	);
};


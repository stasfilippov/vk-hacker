import {FC} from 'react';
import {Counter, Div, Link, SimpleCell, Spacing, Title, VisuallyHidden} from '@vkontakte/vkui';
import {Icon20CalendarOutline, Icon20CommentOutline, Icon20User} from '@vkontakte/icons';
import {StoryType} from '../../api/hackerNewsAPI.ts';
import {convertDate} from '../../utils/convertDate.ts';
import {TreeOfComments} from '../../containers/TreeOfComments/TreeOfComments.tsx';

type StoryProps = {
	story: StoryType
}
export const Story:FC<StoryProps> = ({story}) => {

	const dateOfStory = convertDate(story?.time)


	return (
		<Div>
			<Link href={story?.url}>{story?.url}</Link>
			<Spacing size={16}/>
			<Title level={'1'}>{story?.title}</Title>
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
				indicator={
					<Counter mode={"secondary"}>
						<VisuallyHidden>Всего:</VisuallyHidden> {story?.descendants}
					</Counter>
				}
			>
				Комментарии:
			</SimpleCell>
			<div>Кнопка для обновления комментариев</div>

			{/*<SimpleCell expandable={'auto'} before={<Icon20CommentOutline/>}>{story?.descendants}</SimpleCell>*/}
			<div>Comments</div>
			{story.kids && <TreeOfComments arrKids={story.kids}/>}




		</Div>
	);
};


import { CommentProps } from '../types';

import './Comment.scss';

const Comment: React.FC<CommentProps> = (props): JSX.Element => {
	return (
		<div className={'comment'}>
			<p> {props.body}</p>
			<span>
				<i className={'fas fa-user'}></i> {props.name}
			</span>
		</div>
	);
};

export default Comment;

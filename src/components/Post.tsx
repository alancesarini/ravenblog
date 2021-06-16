import { Link, useParams } from 'react-router-dom';

import { PostProps } from '../types';
import Comment from './Comment';

import './Post.scss';

const Post: React.FC<PostProps> = (props): JSX.Element => {
	const { postId } = useParams<{ postId?: string }>();

	const postClickHandler = (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const commentList = props.comments ? (
		<div className={'comment-list'}>
			<h4>{props.comments.length} comments</h4>
			{props.comments.map((comment) => (
				<Comment
					key={comment.id}
					name={comment.name}
					email={comment.email}
					body={comment.body}
				/>
			))}
		</div>
	) : null;

	return (
		<article>
			<div className={'card post'}>
				<div className={'post-title'}>
					{postId && <h3>{props.title}</h3>}

					{!postId && (
						<Link
							to={`/post/${props.id}`}
							onClick={postClickHandler}
						>
							<h3>{props.title}</h3>
						</Link>
					)}
				</div>
				<div className={'post-body'}>
					<p>{props.body}</p>
				</div>
				{postId && (
					<div className={'post-comments'}>
						<p>
							<button onClick={() => props.click(props.id)}>
								{props.isLoading && (
									<span>
										<img
											src={'/loading-small.gif'}
											alt="loading"
											title="loading"
										/>{' '}
										Loading comments...
									</span>
								)}

								{!props.isLoading && (
									<span>
										<i className={'fas fa-comments'}></i>{' '}
										View comments
									</span>
								)}
							</button>
						</p>
						{props.comments &&
							props.comments.length > 0 &&
							commentList}
					</div>
				)}
			</div>
		</article>
	);
};

export default Post;

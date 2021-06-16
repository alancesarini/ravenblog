import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import {
	API_URL,
	POSTS_ENDPOINT,
	USERS_ENDPOINT,
	COMMENTS_ENDPOINT,
} from '../constants';
import { PostData, PostListProps, UserData } from '../types';
import Post from './Post';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

const PostList: React.FC<PostListProps> = (props): JSX.Element => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [currentPostLoading, setCurrentPostLoading] = useState<number>(0);

	const { userId, postId } =
		useParams<{ userId?: string; postId?: string }>();

	const getPostCommentsById = async (postId: number) => {
		const currentPost = posts.find((post: PostData) => post.id === postId);

		if (
			currentPost &&
			currentPost.comments &&
			currentPost.comments.length > 0
		) {
			return currentPost;
		}

		setCurrentPostLoading(postId);

		try {
			const response = await axios.get(
				`${API_URL}/${POSTS_ENDPOINT}/${postId}/${COMMENTS_ENDPOINT}`
			);
			const updatedPosts = [...posts];
			const postIndex = updatedPosts.findIndex(
				(post) => post.id === postId
			);
			if (postIndex > -1) {
				updatedPosts[postIndex].comments = response.data;
				setPosts(updatedPosts);
			}
		} catch (err) {
			setIsError(true);
		}

		setCurrentPostLoading(0);
	};

	const postClickHandler = (postId: number): void => {
		getPostCommentsById(postId);
	};

	const getPosts = useCallback(async () => {
		setIsLoading(true);

		try {
			let url;

			if (userId) {
				url = `${API_URL}/${USERS_ENDPOINT}/${userId}/${POSTS_ENDPOINT}`;
			} else if (postId) {
				url = `${API_URL}/${POSTS_ENDPOINT}/${postId}`;
			} else {
				url = `${API_URL}/${POSTS_ENDPOINT}`;
			}

			const response = await axios.get<PostData[]>(url);
			const posts = Array.isArray(response.data)
				? response.data
				: [response.data];
			setPosts(posts);
		} catch (err) {
			setIsError(true);
		}

		setIsLoading(false);
	}, [userId, postId]);

	useEffect(() => {
		getPosts();
	}, [userId, postId, getPosts]);

	const postList =
		posts.length > 0
			? posts.map((post: PostData) => (
					<Post
						{...post}
						key={post.id}
						click={postClickHandler}
						isLoading={currentPostLoading === post.id}
					/>
			  ))
			: null;

	let selectedUserName = '';
	if (userId) {
		const selectedUser = (props.users || []).find(
			(user: UserData) => user.id === parseInt(userId)
		);
		if (selectedUser) {
			selectedUserName = selectedUser.name;
		}
	}

	return (
		<div className={'post-list'}>
			{userId && (
				<div className={'title-with-action'}>
					<h3 className={'title'}>
						Posts published by <em>{selectedUserName}</em>
					</h3>
					<Link to={'/'}>
						<i className={'fas fa-arrow-circle-left'}></i> back
					</Link>
				</div>
			)}

			{postId && (
				<div className={'title-with-action'}>
					<h3 className={'title'}>Detailed view</h3>
					<Link to={'/'}>
						<i className={'fas fa-arrow-circle-left'}></i> back
					</Link>
				</div>
			)}

			{!userId && !postId && <h3 className={'title'}>All posts</h3>}

			{isLoading && <LoadingIndicator />}

			{isError && <ErrorIndicator />}

			{!isLoading && !isError && postList}
		</div>
	);
};

export default PostList;

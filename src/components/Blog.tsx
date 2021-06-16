import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import { API_URL, USERS_ENDPOINT } from '../constants';
import User from './User';
import { UserData } from '../types';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

import './Blog.scss';
import PostList from './PostList';

const Blog: React.FC = (): JSX.Element => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getUsers = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get<UserData[]>(
				`${API_URL}/${USERS_ENDPOINT}`
			);
			setUsers(response.data);
		} catch (err) {
			setIsError(true);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const userList = users.map((user: UserData) => (
		<User {...user} key={user.id} />
	));

	const blog = (
		<div className={'blog'}>
			<main>
				{isError && <ErrorIndicator />}

				<div className={'posts'}>
					<PostList users={users} />
				</div>
			</main>
			<aside>
				<h3 className={'title'}>Users</h3>
				<div className={'users'}>
					{isLoading && <LoadingIndicator />}
					{!isLoading && userList}
				</div>
			</aside>
		</div>
	);

	return (
		<BrowserRouter>
			<Switch>
				<Route path={'/'} exact={true}>
					{blog}
				</Route>

				<Route path={'/user/:userId'} exact={true}>
					{blog}
				</Route>

				<Route path={'/post/:postId'} exact={true}>
					{blog}
				</Route>

				<Route>
					<ErrorIndicator />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Blog;

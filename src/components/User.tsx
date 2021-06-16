import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { UserProps } from '../types';

import './User.scss';

const User: React.FC<UserProps> = (props): JSX.Element => {
	const [avatar, setAvatar] = useState<string | null>(null);

	const getAvatar = async () => {
		try {
			const response = await axios.get('https://randomuser.me/api/');
			if (response.data) {
				setAvatar(response.data.results[0].picture.medium);
			}
		} catch (err) {}
	};

	const userClickHandler = (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		getAvatar();
	}, []);

	return (
		<Link
			onClick={userClickHandler}
			to={`/user/${props.id}`}
			className={'user-wrapper'}
		>
			<div className={'user'}>
				<div className={'avatar'}>
					{avatar && (
						<img src={avatar} alt={props.name} title={props.name} />
					)}

					{!avatar && <div className={'default-avatar'}></div>}
				</div>
				<div className={'info'}>
					<h2 className={'name'}>{props.name}</h2>
					<span className={'company'}>{props.company.name}</span>
				</div>
			</div>
		</Link>
	);
};

export default User;

export interface CommentData {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface CommentProps {
	name: string;
	email: string;
	body: string;
}

export interface PostData {
	userId: number;
	id: number;
	title: string;
	body: string;
	comments: CommentData[];
}

export interface PostProps {
	key: number;
	userId: number;
	id: number;
	title: string;
	body: string;
	comments: CommentData[];
	click: any;
	isLoading: boolean;
}

export interface PostListProps {
	users?: UserData[];
}

interface Geo {
	lat: string;
	lng: string;
}

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;
}

interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface UserData {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

export interface UserProps {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

export interface ErrorTypes {
	type: string;
	isError: boolean;
}

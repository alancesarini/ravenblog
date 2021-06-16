import React from 'react';
import './App.scss';

import Blog from './components/Blog';
import Header from './components/Header';

const App: React.FC = (): JSX.Element => {
	return (
		<div className={'app dark-theme'}>
			<Header />
			<Blog />
		</div>
	);
};

export default App;

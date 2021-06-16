import './LoadingIndicator.scss';

const LoadingIndicator: React.FC = (): JSX.Element => {
	return (
		<div className={'loading-indicator'}>
			<img src={'/loading.gif'} alt={'loading'} title={'loading'} />
		</div>
	);
};

export default LoadingIndicator;

import './ErrorIndicator.scss';

const ErrorIndicator: React.FC = (): JSX.Element => {
	return (
		<div className={'error-indicator'}>
			<i className={'fas fa-exclamation-triangle'}></i>
			<p>Oops! There was an error. Sorry about that.</p>
		</div>
	);
};

export default ErrorIndicator;

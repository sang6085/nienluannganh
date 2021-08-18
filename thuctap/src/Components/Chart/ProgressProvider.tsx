import React from 'react';
interface ProgressProviderProps {
	valueStart?: number;
	valueEnd?: number;
	children?: any;
}
const ProgressProvider: React.FC<ProgressProviderProps> = (props) => {
	const [value, setValue] = React.useState(props.valueStart);
	React.useEffect(() => {
		setValue(props.valueEnd);
	}, [props.valueEnd]);

	return props.children(value);
};
export default ProgressProvider;

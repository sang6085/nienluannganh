import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import './i18n';
const Demo: React.FC = () => {
	const { t, i18n } = useTranslation();
	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};
	return (
		<React.Fragment>
			<ButtonComponent variant="contained" color="primary" onClick={() => changeLanguage('en')}>
				EN
			</ButtonComponent>
			&nbsp;
			<ButtonComponent variant="contained" color="primary" onClick={() => changeLanguage('vi')}>
				VI
			</ButtonComponent>
		</React.Fragment>
	);
};
export default Demo;

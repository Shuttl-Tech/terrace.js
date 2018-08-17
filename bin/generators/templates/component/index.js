import React, { Component } from 'react';
import { translate } from 'react-i18next';

import css from './styles.module.css';

export class ___componentName___ extends Component {
	render() {
		// template-begin complete-component keep
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
		};

		// template-end complete-component
		const { t, i18n } = this.props;

		return (
			<div>
				// template-begin complete-component keep
				<span>{t('welcome-to-comp', { comp: '___componentName___' })}</span>
				<div className={css['lang-toggle']}>
					<button onClick={() => changeLanguage('de')}>{t('change-to-de')}</button>
					<button onClick={() => changeLanguage('en')}>{t('change-to-en')}</button>
				</div>
				// template-end complete-component
				// template-begin complete-component remove
				<span>{t('welcome-to-comp', { comp: '___componentName___' })}</span>
				// template-end complete-component
			</div>
		)
	}
}

export default translate()(___componentName___);

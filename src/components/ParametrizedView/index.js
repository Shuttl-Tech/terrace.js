import React, { Component } from 'react';
import { translate } from 'react-i18next';

import css from './styles.module.scss';

export class ParametrizedView extends Component {
	render() {
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
		};

		const { t, i18n } = this.props;

		return (
			<div>
				<span>{t('welcome-to-view', { view: this.props.match.params.id || 0 })}</span>
				<div className={css['lang-toggle']}>
					<button onClick={() => changeLanguage('de')}>{t('change-to-de')}</button>
					<button onClick={() => changeLanguage('en')}>{t('change-to-en')}</button>
				</div>
			</div>
		)
	}
}

export default translate()(ParametrizedView);

import React, { Component } from 'react';
// template-begin with-i18n keep
import { translate } from 'react-i18next';
// template-end with-i18n

import css from './styles.module.scss';

class ParametrizedView extends Component {
	render() {
		// template-begin with-i18n keep
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
		);
		// template-end with-i18n
		// template-begin with-i18n remove
		// noinspection UnreachableCodeJS // template-line generic remove
		return (
			<div>
				<span>Welcome to view {this.props.match.params.id || 0 }</span>
			</div>
		);
		// template-end with-i18n
	}
}

// template-begin with-i18n keep
export default translate()(ParametrizedView);
// template-end with-i18n
// template-begin with-i18n remove
export default ParametrizedView;
// template-end with-i18n

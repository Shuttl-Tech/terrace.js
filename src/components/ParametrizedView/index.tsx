import React, { Component } from 'react';
import { translate } from 'react-i18next'; // template-line with-i18n keep

import css from './styles.module.scss';
import { I18nProps } from 'types/i18n'; // template-line with-i18n keep
import { RouteComponentProps } from 'react-router';

// @ts-ignore // template-line generic remove
type Props = I18nProps & RouteComponentProps<{ id: string }>; // template-line with-i18n keep
// @ts-ignore // template-line generic remove
type Props = RouteComponentProps<{ id: string }>; // template-line with-i18n remove

class ParametrizedView extends Component<Props> {
	render() {
		// template-begin with-i18n keep
		const { t, i18n } = this.props;
		const changeLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
		};
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

// @ts-ignore // template-line generic remove
export default translate()(ParametrizedView); // template-line with-i18n keep
// @ts-ignore // template-line generic remove
export default ParametrizedView; // template-line with-i18n remove

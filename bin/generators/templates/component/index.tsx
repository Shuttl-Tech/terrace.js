// template-begin pure-component keep
import React, { PureComponent } from 'react';
// template-end pure-component
// template-begin pure-component remove
import React, { Component } from 'react';
// template-end pure-component
// template-begin with-i18n keep
import { translate } from 'react-i18next';

import { I18nProps } from 'types/i18n';
// template-end with-i18n

import css from './styles.module.scss';

interface ComponentProps {
	id: string
}

// @ts-ignore // template-line generic remove
type Props = I18nProps & ComponentProps; // template-line with-i18n keep
// @ts-ignore // template-line generic remove
type Props = ComponentProps; // template-line with-i18n remove

// template-begin pure-component keep
class ___componentName___ extends PureComponent<Props> {
// template-end pure-component
// template-begin pure-component remove
class ___componentName___ extends Component<Props> {
// template-end pure-component
	// template-begin complete-component keep
	constructor(props: Props) {
		super(props);
	}

	// template-end complete-component
	render() {
		// template-begin with-i18n keep
		// template-begin complete-component keep
		const { t, i18n, id } = this.props;
		// template-end complete-component
		// template-begin complete-component remove
		const { t, id } = this.props;
		// template-end complete-component
		// template-end with-i18n
		// template-begin with-i18n remove
		const { id } = this.props;
		// template-end with-i18n
		// template-begin complete-component keep
		// template-begin with-i18n keep

		const changeLanguage = (lang: string) => {
			i18n.changeLanguage(lang);
		};
		// template-end with-i18n
		// template-end complete-component

		return (
			<div className={css.container}>
				// template-begin with-i18n keep
				// template-begin complete-component keep
				<span title={id}>{t('welcome-to-comp', { comp: '___componentName___' })}</span>
				<div className={css['lang-toggle']}>
					<button onClick={() => changeLanguage('de')}>{t('change-to-de')}</button>
					<button onClick={() => changeLanguage('en')}>{t('change-to-en')}</button>
				</div>
				// template-end complete-component
				// template-begin complete-component remove
				<span title={id}>{t('welcome-to-comp', { comp: '___componentName___' })}</span>
				// template-end complete-component
				// template-end with-i18n
				// template-begin with-i18n remove
				<span title={id}>Welcome to component ___componentName___!</span>
				// template-end with-i18n
			</div>
		)
	}
}

// template-begin with-i18n keep
export default translate()(___componentName___);
// template-end with-i18n
// template-begin with-i18n remove
export default ___componentName___;
// template-end with-i18n

import React from 'react';
import { useTranslation } from 'react-i18next'; // template-line with-i18n keep
import useRouter from 'use-react-router';

import css from './styles.module.scss';

const ParametrizedView = () => {
  const { match } = useRouter<{ id: string }>();
  // template-begin with-i18n keep
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);
  return (
  	<div>
  		<span>{t('welcome-to-view', { view: match.params.id || 0 })}</span>
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
  		<span>Welcome to view {match.params.id || 0 }</span>
  	</div>
  );
  // template-end with-i18n
}

export default ParametrizedView;

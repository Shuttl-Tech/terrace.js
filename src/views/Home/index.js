import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { Link, withRouter, Route } from 'react-router-dom';
// template-begin with-i18n keep
import { translate } from 'react-i18next';
// template-end with-i18n

import { ROUTES, PARAMETRIZED_ROUTES } from 'routes';
import { SESSION_FETCH_REQUEST } from './session-actions';
import { SESSION_STATE } from './session-reducer';
import { parametrizePath } from 'utils/transition';

import ParametrizedView from 'components/ParametrizedView';

import css from './styles.module.scss';

type Props = {
	sessionStatus: string
}

class Home extends Component<Props> {
	componentDidMount() {
		let { authToken } = parse(window.location.search);
		this.props.checkAuthentication(authToken);
	}

	render() {
		// template-begin with-i18n keep
		const { t, sessionStatus } = this.props;

		switch(sessionStatus) {
			case SESSION_STATE.AUTHENTICATED:
				return (
					<div className={css['routes-wrapper']}>
						<Route path={ROUTES.BASE} render={() => (
							<div>
								<h1>{t('hello-world')}</h1>
								<Link exact to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>{t('visit-path')}</Link>
							</div>
						)}/>
						<Route path={ROUTES.ITEMS} render={(props) => <ParametrizedView {...props} />}/>
						<Route path={PARAMETRIZED_ROUTES.ITEM} render={(props) => <ParametrizedView {...props} />}/>
					</div>
				);
			case SESSION_STATE.AUTH_FAILED:
				return (<h3>{t('auth-failed-msg')}<br />{t('re-auth-needed')}</h3>);
			default:
				return (t('auth-pending-msg'));
		}
		// template-end with-i18n
		// template-begin with-i18n remove
		// noinspection UnreachableCodeJS // template-line generic remove
		switch(this.props.sessionStatus) {
			case SESSION_STATE.AUTHENTICATED:
				return (
					<div className={css['routes-wrapper']}>
						<Route path={ROUTES.BASE} render={() => (
							<div>
								<h1>Hello World! Welcome to the Terrace!</h1>
								<Link exact to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>Visit Path for Item</Link>
							</div>
						)}/>
						<Route path={ROUTES.ITEMS} render={(props) => <ParametrizedView {...props} />}/>
						<Route path={PARAMETRIZED_ROUTES.ITEM} render={(props) => <ParametrizedView {...props} />}/>
					</div>
				);
			case SESSION_STATE.AUTH_FAILED:
				return (<h3>Authentication Failed...<br />Reauthentication required.</h3>);
			default:
				return (<h3>Authentication Pending...</h3>);
		}
		// template-end with-i18n
	}
}

const mapStateToProps = ({ session: { status } }) => {
  return { sessionStatus: status };
};

const mapDispatchToProps = dispatch => {
	return {
		checkAuthentication: (token) => { dispatch(SESSION_FETCH_REQUEST({ token })) }
	}
};

// template-begin with-i18n keep
export default translate()(withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)));
// template-end with-i18n
// template-begin with-i18n remove
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
// template-end with-i18n

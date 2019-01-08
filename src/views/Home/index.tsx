import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { Link, withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { translate } from 'react-i18next'; // template-line with-i18n keep

import { ROUTES, PARAMETRIZED_ROUTES } from 'routes';
import { SESSION_FETCH_REQUEST } from './session.actions';
import { SESSION_STATE } from './session.reducer';
import { parametrizePath } from 'utils/transition';
import { I18nProps } from 'types/i18n'; // template-line with-i18n keep
import { Dispatch } from 'redux';
import ParametrizedView from 'components/ParametrizedView';
import css from './styles.module.scss';

interface ComponentProps {
	id: number
}

interface StateProps {
	sessionStatus: string,
}

interface DispatchProps {
	checkAuthentication: (token: string) => void
}

// @ts-ignore // template-line generic remove
type Props = I18nProps & StateProps & DispatchProps & ComponentProps & RouteComponentProps<{}>; // template-line with-i18n keep
// @ts-ignore // template-line generic remove
type Props = StateProps & DispatchProps & ComponentProps & RouteComponentProps<{}>; // template-line with-i18n remove

class Home extends Component<Props> {
	componentDidMount() {
		let { authToken = '' } = parse(window.location.search);
		if (typeof authToken === 'string') {
			this.props.checkAuthentication(authToken);
		}
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
								<Link to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>{t('visit-path')}</Link>
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
								<Link to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>Visit Path for Item</Link>
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

type StateToProps = {
	session: {
		status: SESSION_STATE
	}
}

const mapStateToProps = ({ session: { status: sessionStatus } }: StateToProps): StateProps => {
  return { sessionStatus };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		checkAuthentication: (token) => { dispatch(SESSION_FETCH_REQUEST({ token })) }
	}
};

// @ts-ignore // template-line generic remove
export default translate()(withRouter(connect<StateProps, DispatchProps, ComponentProps, StateToProps>(mapStateToProps, mapDispatchToProps)(Home))); // template-line with-i18n keep
// @ts-ignore // template-line generic remove
export default withRouter(connect<StateProps, DispatchProps, ComponentProps, StateToProps>(mapStateToProps, mapDispatchToProps)(Home)); // template-line with-i18n remove

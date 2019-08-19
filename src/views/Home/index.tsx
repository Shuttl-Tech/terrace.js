import React, { ReactNode, MouseEvent, useCallback, useLayoutEffect } from 'react';
import useRouter from 'use-react-router';
import { parse } from 'query-string';
import { Link, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // template-line with-i18n keep
import CloseIcon from '@material-ui/icons/Close';
import { Dispatch } from 'redux';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { Slide, ToastContainer } from 'react-toastify';

import { ROUTES, PARAMETRIZED_ROUTES } from 'routes';
import { SESSION_FETCH_REQUEST } from './session.actions';
import { SESSION_STATE } from './session.reducer';
import { parametrizePath, setHistoryInstance } from 'utils/transition';
import ParametrizedView from 'components/ParametrizedView';
import css from './styles.module.scss';
import Toast, { TOAST_AUTOCLOSE_TIME, TYPE } from 'utils/toasts';

interface StateProps {
  sessionStatus: string,
}

interface DispatchProps {
  checkAuthentication: (token: string) => void
}

const Home = () => {
  const { t } = useTranslation(); // template-line with-i18n keep
  const dispatchProps = useCallback(mapDispatchToProps, []);
  const mapState = useCallback(mapStateToProps, []);
  const { sessionStatus } = useMappedState(mapState);
  const { checkAuthentication } = dispatchProps(useDispatch());
  const { location, history } = useRouter();

  useLayoutEffect(() => {
  	let { authToken = '' } = parse(location.search);
  	if (typeof authToken === 'string') checkAuthentication(authToken);
  	setHistoryInstance(history)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerToast = useCallback(() => Toast('Hello, world! This toast was triggered at: ' + new Date().toISOString(), { type: TYPE.SUCCESS }), []);

  let contextualContent: ReactNode = <></>;
  // template-begin with-i18n keep
  switch(sessionStatus) {
  	case SESSION_STATE.AUTHENTICATED:
  		contextualContent = (
  			<div className={css['routes-wrapper']}>
  				<Route path={ROUTES.BASE} render={() => (
  					<div>
  						<h1>{t('hello-world')}</h1>
  						<button onClick={triggerToast}>{t('trigger-toast')}</button>
  						<br/><hr/><br/>
  						<Link to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>{t('visit-path', { item: 1 })}</Link>
  					</div>
  				)}/>
  				<Route path={ROUTES.ITEMS} component={ParametrizedView}/>
  				<Route path={PARAMETRIZED_ROUTES.ITEM} component={ParametrizedView}/>
  			</div>
  		);
  		break;
  	case SESSION_STATE.AUTH_FAILED:
  		contextualContent = (<h3>{t('auth-failed-msg')}<br />{t('re-auth-needed')}</h3>);
  		break;
  	default:
  		contextualContent = (t('auth-pending-msg'));
  }
  // template-end with-i18n
  // template-begin with-i18n remove
  // noinspection UnreachableCodeJS // template-line generic remove
  switch(sessionStatus) {
  	case SESSION_STATE.AUTHENTICATED:
  		contextualContent = (
  			<div className={css['routes-wrapper']}>
  				<Route path={ROUTES.BASE} render={() => (
  					<div>
  						<h1>Hello World! Welcome to the Terrace!</h1>
  						<button onClick={triggerToast}>Trigger Toast</button>
  						<br/><hr/><br/>
  						<Link to={parametrizePath(PARAMETRIZED_ROUTES.ITEM, 1)}>Visit Path for Item</Link>
  					</div>
  				)}/>
  				<Route path={ROUTES.ITEMS} component={ParametrizedView}/>
  				<Route path={PARAMETRIZED_ROUTES.ITEM} component={ParametrizedView}/>
  			</div>
  		);
  		break;
  	case SESSION_STATE.AUTH_FAILED:
  		contextualContent = (<h3>Authentication Failed...<br />Reauthentication required.</h3>);
  		break;
  	default:
  		contextualContent = (<h3>Authentication Pending...</h3>);
  }
  // template-end with-i18n

  return (
  	<div className={css['primary-layout-container']}>
  		{contextualContent}
  		<ToastContainer
  			transition={Slide} draggable={true} draggablePercent={50} position='bottom-right'
  			closeButton={<CloseToastButton/>} closeOnClick={false}
  			className={css['toasts-list-container']} bodyClassName={css['toast-body']}
  			toastClassName={css['toast-container']} autoClose={TOAST_AUTOCLOSE_TIME}
  		/>
  	</div>
  );
}

type CloseToastButtonProps = { closeToast?: (e: MouseEvent<SVGElement>) => void };
const CloseToastButton = ({closeToast = () => {}}: CloseToastButtonProps) => <CloseIcon className={css.close} onClick={closeToast}/>;

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

export default Home;

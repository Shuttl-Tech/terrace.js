// template-begin pure-component keep
import React, { PureComponent } from 'react';
// template-end pure-component
// template-begin pure-component remove
import React, { Component } from 'react';
// template-end pure-component
// template-begin reducer-snippets keep
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { parse } from 'query-string';
// template-end reducer-snippets
import { withRouter, RouteComponentProps } from 'react-router-dom';
// template-begin intl-support keep
import { translate } from 'react-i18next';
// template-end intl-support
// template-begin reducer-snippets keep

import { ___resourceName____FETCH_REQUEST } from './___lowerCaseResourceName___.actions';
import { REQUEST_STATE } from 'globals/constants';
// template-end reducer-snippets
import { I18nProps } from 'types/i18n'; // template-line intl-support keep

import css from './styles.module.scss';

interface ComponentProps {}

// template-begin reducer-snippets keep
interface StateProps {
	requestStatus: REQUEST_STATE,
}

interface DispatchProps {
	fetchViewData: (id: string) => void
}

type Props = I18nProps & StateProps & DispatchProps & ComponentProps & RouteComponentProps<{}>; // template-line intl-support keep
type Props = StateProps & DispatchProps & ComponentProps & RouteComponentProps<{}>; // template-line intl-support remove
// template-end reducer-snippets
// template-begin reducer-snippets remove
type Props = I18nProps & ComponentProps & RouteComponentProps<{}>; // template-line intl-support keep
type Props = ComponentProps & RouteComponentProps<{}>; // template-line intl-support remove
// template-end reducer-snippets

// template-begin pure-component keep
class ___componentName___ extends PureComponent<Props> {
// template-end pure-component
// template-begin pure-component remove
class ___componentName___ extends Component<Props> {
// template-end pure-component
	// template-begin reducer-snippets keep
	componentDidMount() {
		let { id } = parse(window.location.search);
		if (id && typeof id === 'string') {
			this.props.fetchViewData(id);
		}
	}

	// template-end reducer-snippets
	render() {
		// template-begin intl-support keep
		const { t } = this.props;
		// template-end intl-support
		// template-begin reducer-snippets keep

		// --1 template-begin intl-support keep
		switch(this.props.requestStatus) {
			case REQUEST_STATE.SUCCESS:
				return (t('view-data-loaded'));
			case REQUEST_STATE.FAILURE:
				return (t('view-data-failed'));
			default:
				return (t('view-data-pending'));
		}
		// --1 template-end intl-support
		// --2 template-begin intl-support remove
		switch(this.props.requestStatus) {
			case REQUEST_STATE.SUCCESS:
				return 'View data loaded.';
			case REQUEST_STATE.FAILURE:
				return 'View data failed.';
			default:
				return 'View data pending.';
		}
		// --2 template-end intl-support
		// template-end reducer-snippets
		// template-begin reducer-snippets remove
		// noinspection UnreachableCodeJS -- WebStorm syntax inspection comment // template-line generic remove
		// --1 template-begin intl-support keep
		return (t('view-data-loaded'));
		// --1 template-end intl-support
		// --2 template-begin intl-support remove
		return 'View data loaded.';
		// --2 template-end intl-support
		// template-end reducer-snippets
	}
}
// template-begin reducer-snippets keep
type StateToProps = {
	leaderboard: {
		status: REQUEST_STATE
	}
}

const mapStateToProps = ({ ___camelCaseResourceName___: { status } }: StateToProps) => {
  return { requestStatus: status };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
	return {
		fetchViewData: (id) => { dispatch(___resourceName____FETCH_REQUEST({ id })) }
	}
};

export default translate()(withRouter(connect<StateProps, DispatchProps, ComponentProps, StateToProps>(mapStateToProps, mapDispatchToProps)(___componentName___)));
// template-end reducer-snippets
// template-begin reducer-snippets remove

// --1 template-begin intl-support keep
export default translate()(withRouter(___componentName___));
// --1 template-end intl-support
// --2 template-begin intl-support remove
export default withRouter(___componentName___);
// --2 template-end intl-support
// template-end reducer-snippets

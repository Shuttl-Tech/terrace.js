// template-begin pure-component keep
import React, { PureComponent } from 'react';
// template-end pure-component
// template-begin pure-component remove
import React, { Component } from 'react';
// template-end pure-component
// template-begin reducer-snippets keep
import { connect } from 'react-redux';
import { parse } from 'query-string';
// template-end reducer-snippets
import { withRouter } from 'react-router-dom';
// template-begin intl-support keep
import { translate } from 'react-i18next';
// template-end intl-support
// template-begin reducer-snippets keep

import { ___resourceName____FETCH_REQUEST } from './___lowerCaseResourceName___-actions';
import { REQUEST_STATE } from 'globals/constants';
// template-end reducer-snippets

import css from './styles.module.scss';

type Props = {
	requestStatus: string	// template-line reducer-snippets keep
}

// template-begin pure-component keep
class ___componentName___ extends PureComponent<Props> {
// template-end pure-component
// template-begin pure-component remove
class ___componentName___ extends Component {
// template-end pure-component
	// template-begin reducer-snippets keep
	componentDidMount() {
		let { id } = parse(window.location.search);
		this.props.fetchViewData(id);
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

const mapStateToProps = ({ ___camelCaseResourceName___: { status } }) => {
  return { requestStatus: status };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchViewData: (id) => { dispatch(___resourceName____FETCH_REQUEST({ id })) }
	}
};

export default translate()(withRouter(connect(mapStateToProps, mapDispatchToProps)(___componentName___)));
// template-end reducer-snippets
// template-begin reducer-snippets remove

// --1 template-begin intl-support keep
export default translate()(withRouter(___componentName___));
// --1 template-end intl-support
// --2 template-begin intl-support remove
export default withRouter(___componentName___);
// --2 template-end intl-support
// template-end reducer-snippets

import React, { Component } from 'react';
// template-begin reducer-snippets keep
import { connect } from 'react-redux';
import { parse } from 'query-string';
// template-end reducer-snippets
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
// template-begin reducer-snippets keep

import { ___resourceName____FETCH_REQUEST } from './___lowerCaseResourceName___-actions';
import { REQUEST_STATE } from './___lowerCaseResourceName___-reducer';
// template-end reducer-snippets

import css from './styles.module.css';

type Props = {
	requestStatus: string	// template-line reducer-snippets keep
}

export class ___componentName___ extends Component<Props> {
	// template-begin reducer-snippets keep
	componentDidMount() {
		let { id } = parse(window.location.search);
		this.props.fetchViewData(id);
	}

	// template-end reducer-snippets
	render() {
		const { t } = this.props;
	// template-begin reducer-snippets keep

		switch(this.props.requestStatus) {
			case REQUEST_STATE.SUCCESS:
				return (t('view-data-loaded'));
			case REQUEST_STATE.FAILURE:
				return (t('view-data-failed'));
			default:
				return (t('view-data-pending'));
		}
		// template-end reducer-snippets
		// template-begin reducer-snippets remove
		// noinspection UnreachableCodeJS -- WebStorm syntax inspection comment // template-line generic remove
		return (t('view-data-loaded'));
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

export default translate()(withRouter(___componentName___));
// template-end reducer-snippets

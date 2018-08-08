import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

import { ___resourceName____FETCH_REQUEST } from './actions';
import { REQUEST_STATE } from './reducer';

import css from './styles.module.css';

type Props = {
	requestStatus: string
}

export class ___componentName___ extends Component<Props> {
	componentDidMount() {
		let { id } = parse(window.location.search);
		this.props.fetchViewData(id);
	}

	render() {
		const { t } = this.props;

		switch(this.props.requestStatus) {
			case REQUEST_STATE.SUCCESS:
				return (t('view-data-loaded'));
			case REQUEST_STATE.FAILURE:
				return (t('view-data-failed'));
			default:
				return (t('view-data-pending'));
		}
	}
}

const mapStateToProps = ({ ___reducerName___: { status } }) => {
  return { requestStatus: status };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchViewData: (id) => { dispatch(___resourceName____FETCH_REQUEST({ id })) }
	}
};

export default translate()(withRouter(connect(mapStateToProps, mapDispatchToProps)(___componentName___)));

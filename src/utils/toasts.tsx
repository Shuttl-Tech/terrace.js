import React, { ComponentType, ReactNode } from 'react';
import { toast, TypeOptions } from 'react-toastify';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import cls from 'classnames';

import css from 'views/Home/styles.module.scss';
import { Omit } from 'types';

export const TOAST_AUTOCLOSE_TIME = 4000; //ms

const variantIcon: { [key in TypeOptions]: ComponentType<SvgIconProps> } = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
	default: InfoIcon
};

const defaultOptions = { type: toast.TYPE.INFO };

type ToastsContainerProps = {
	content: ReactNode,
	type: TypeOptions,
	autoClose?: number | false
}

const ToastContainer = ({ content, type, autoClose = TOAST_AUTOCLOSE_TIME }: ToastsContainerProps) => {
	let Icon = variantIcon[type];
	let className = css[`toast-variation--${type}`];
	return (
		<SnackbarContent
			className={cls(css.toast, className, !autoClose && css['toast-variation--sticky'])}
			message={
				<div className={css['toast-content']}>
					<Icon className={css['toast-icon']}/>
					<span className={css['toast-message']}>{content}</span>
				</div>
			}
		/>
	)
};

const Toast = (content: ReactNode, paramOptions : Omit<ToastsContainerProps, 'content'> = { type: TYPE.INFO }) => {
	const options = { ...defaultOptions, ...paramOptions };
	toast(() => <ToastContainer content={content} {...options}/>, options);
};

export const TYPE = toast.TYPE;

export default Toast;

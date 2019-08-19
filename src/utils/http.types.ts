import { AxiosRequestConfig } from 'axios';

export type CustomOptionsProps = {
  formData?: boolean,
  body?: any,
  headers?: object
};

export type ModifyRequestOptionsProps = AxiosRequestConfig & CustomOptionsProps;

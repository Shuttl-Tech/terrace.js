import { AxiosError } from 'axios';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import Toast, { TYPE } from 'utils/toasts';
import * as React from 'react';


export const handleHTTPErrors = (err: AxiosError) => {
  if (!(err.response && err.response.status)) return;
  if (err.response.status === NOT_FOUND) return;

  if (err.response.status === INTERNAL_SERVER_ERROR) {
  	Toast(<div>This request failed because of a SERVER ERROR.<br/>Please check logs, and notify the developers.</div>, { type: TYPE.ERROR, autoClose: false });
  } else if (err.response.data && err.response.data.error && err.response.data.error.message) {
  	Toast(<div>Error:<br/>{err.response.data.error.message}</div>, { type: TYPE.ERROR });
  }
};

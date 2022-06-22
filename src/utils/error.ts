import router from '../router'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/errors';

export const handleError = (error: AxiosError<ErrorResponse, any>): ErrorResponse => {
  console.dir(error);
  if(error.response) {
    const { status, data } = error.response;
    if(status === 401) {
      alert('세션이 만료되었습니다.');
      router.push('/login');
    } else {
      return {
        name: data.name || 'Error',
        message: data.message || 'Error occurred'
      };
    }
  } else {
    return {
      name: 'Error',
      message: error.message,
      stack: error.stack
    };
  }
}
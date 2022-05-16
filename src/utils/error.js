import router from '../router'

export const handleError = (error) => {
  console.dir(error);
  if(error.response) {
    const { status, data: { error: { name, message } } } = error.response;
    if(status === 401) {
      if(name === 'TokenExpiredError') {
        alert('세션이 만료되었습니다.');
        router.push('/login');
      } else {
        return { name, message };
      }
    } else {
      return { name, message };
    }
  }
}
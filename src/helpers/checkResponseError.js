import { showMessage } from 'react-native-flash-message';

const checkResponseError = e => {
  if ('message' in e || 'error' in e) {
    showMessage({
      message: e.messages ? e.messages.join(', ') : e.message,
      type: 'danger',
      icon: { icon: 'auto', position: 'left' },
      duration: 3000,
    });
  }
  return {};
};

export default checkResponseError;

import { getPostRequest } from '../services/Api';

export const Logar = async () => {
  try {
    const response = await getPostRequest('/auth', {
      email: 'corywong@vulfpeck.com',
      password: 'maincait1',
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

// login
export function signIn({ token, profile, city }) {
  return {
    type: 'SIGN_IN',
    payload: { token, profile, city },
  };
}

// logout
export function signOut() {
  return { type: 'SIGN_OUT' };
}

export function updateProfile({ profile }) {
  return { type: 'UPDATE_PROFILE', payload: { profile } };
}

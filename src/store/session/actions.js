
// login
export function signIn({ token, profile }) {
  return {
    type: 'SIGN_IN',
    payload: { token, profile },
  };
}

// logout
export function signOut() {
  return { type: 'SIGN_OUT' };
}

export function updateProfile({profile}) {
  return { type: "UPDATE_PROFILE", payload: { profile } }
}

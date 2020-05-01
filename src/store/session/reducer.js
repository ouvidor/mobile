export default function auth(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      // aplica o token recebido no login, salva o perfil e marca o usuario como logado
      return {
        profile: action.payload.profile,
        token: action.payload.token,
        isSigned: true,
    };
    case 'SIGN_OUT':
      // retira o token, o perfil e marca o usuario como deslogado
      return { token: null, isSigned: false, profile: null };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload.profile }

    default:
      return state;
  }
}

import React, { useState } from 'react';
import { ScrollableContainer, LabeledInput } from '../../components';
import { validarEmail } from '../../helpers';

export default function Cadastro() {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [erro, setErro] = useState({});

  return (
    <ScrollableContainer>
      <LabeledInput
        labelProps={{ label: 'Nome' }}
        inputProps={{
          value: nome,
          onChangeText: setNome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Sobrenome' }}
        inputProps={{
          value: sobrenome,
          onChangeText: setSobrenome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'E-mail' }}
        inputProps={{
          value: email,
          onChangeText: setEmail,
          onBlur: () => {
            const emailValido = validarEmail(email);
            if (!emailValido) {
              setErro({ ...erro, email: true });
            }
          },
          onFocus: () => setErro({ ...erro, email: false }),
          erro: erro.email,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Senha' }}
        inputProps={{
          value: senha,
          onChangeText: setSenha,
        }}
      />
    </ScrollableContainer>
  );
}

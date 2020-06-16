/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '../Button';
import { LabeledInput } from '../Input';
import SelectImage from '../Camera/SelectImage';
import Api from '../../services/Api';

const MReplyButton = styled(Button).attrs(props => ({
  touchableProps: {
    onPress: props.onPress,
  },
  textProps: {
    title: 'Responder',
    loading: props.loading,
  },
}))``;

const RCollapsible = styled.View`
  height: 200px;
  padding: 5px;
`;

export const Reply = props => {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = props.data;

  async function sendReply() {
    setLoading(true);

    /** Construindo objeto a ser enviado no request */
    const data = {
      description: reply,
      status_id: 4, // Status será sempre 'complementada'
    };

    const response = await Api.post(`manifestation/${id}/status`, data);

    if ('message' in response) {
      setError(response.message);
      setLoading(false);
    } else {
      /** Tendo cadastrado o novo status, verifico se temos imagens */
      if (files) {
        const filesData = new FormData();

        files.map(f => {
          const file = {
            uri: f.uri,
            name: f.fileName,
            type: f.type,
          };

          filesData.append('file', file);
        });
        filesData.append('manifestations_id', id);
        filesData.append('manifestations_status_id', response.id);

        const addFile = await Api.post(
          `/files/status/${response.id}`,
          filesData
        );
      }

      setLoading(false);
      props.onSucess();
    }
  }

  return (
    <>
      <MReplyButton
        onPress={() => (reply ? sendReply() : setOpen(!open))}
        loading={loading}
      />
      {open && (
        <RCollapsible>
          <LabeledInput
            label="Sua resposta"
            inputProps={{
              multiline: true,
              autoCorrect: false,
              value: reply,
              onChangeText: setReply,
              errorMessage: error,
              onFocus: () => setError(null),
            }}
          />

          <SelectImage onSelect={data => setFiles(data)} />
        </RCollapsible>
      )}
    </>
  );
};

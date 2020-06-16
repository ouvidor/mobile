/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  ScrollableContainer,
  Text,
  LabeledInput,
  Button,
  SelectCheckbox,
} from '../../components';
import { Subtitle } from './styles';
import Api from '../../services/Api';
import { getCategories } from '../../helpers';
import colors from '../../utils/colors';
import Location from '../../services/Location';

export default function Prefecture() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState();
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState();
  const [attendance, setAttendance] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [manifestationCount, setManifestationCount] = useState();
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState({});
  const [actionMessage, setActionMessage] = useState();

  const { Gray } = colors;

  useEffect(() => {
    async function getPrefecture() {
      try {
        const prefecture = await Api.get('/ombudsman');

        const { name, email, telephone, attendance } = prefecture[0];

        setCity(name);
        setEmail(email);
        setTelephone(telephone);
        setAttendance(attendance);

        getManifestationCount();
        fetchCategories();
      } catch (err) {
        console.log('Não foi possivel capturar dados da prefeitura');
      }
    }

    getPrefecture();
  }, []);

  function clearOnFocus(field) {
    setError({ ...error, [field]: null });
    setActionMessage('');
  }

  function clearInputs() {
    setTitle('');
    setDescription('');
  }

  async function handleManifestation() {
    setBtnLoading(true);

    const requiredData = {
      title: { value: title, field: 'title' },
      description: { value: description, field: 'description' },
      category: {
        value: category.length > 0 ? category : false,
        field: 'categories_id',
      },
      type: { value: 1, field: 'type_id' },
    };

    const errors = {};

    Object.keys(requiredData).map(key => {
      const entry = requiredData[key];
      if (!entry.value) {
        errors[key] = entry.errorMessage
          ? entry.errorMessage
          : 'Campo inválido';
      }
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setBtnLoading(false);
    } else {
      const data = {};
      Object.keys(requiredData).map(key => {
        const entry = requiredData[key];
        data[entry.field] = entry.value;
      });

      Location.getCurrentPosition(location => {
        data.latitude = location.coords.latitude;
        data.longitude = location.coords.longitude;
      });

      const add = await Api.post('/manifestation', data);

      if (add.id) {
        setActionMessage('Sugestão enviada!');
        clearInputs();
      }
    }
    setBtnLoading(false);
  }

  function renderInfo() {
    return (
      <>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
          {city}
        </Text>
        <Subtitle>E-mail</Subtitle>
        <Text>{email}</Text>

        <Subtitle>Telefone</Subtitle>
        <Text>{telephone}</Text>

        <Subtitle>Horário de atendimento</Subtitle>
        <Text>{attendance}</Text>

        <Text />
        <Text>Total de casos relatados: {manifestationCount}</Text>
      </>
    );
  }

  function renderSugestion() {
    return (
      <>
        <Text style={{ marginTop: 50, fontWeight: 'bold', fontSize: 20 }}>
          Envie uma Sugestão
        </Text>
        <Text style={{ fontSize: 14 }}>
          Será criado um manifesto para a sua sugestão
        </Text>

        <SelectCheckbox
          label=""
          blankOption="Selecione uma categoria"
          options={categories}
          onSelect={selectedCategories =>
            setCategory(Object.keys(selectedCategories))
          }
          onPress={() =>
            setError({
              ...error,
              category: false,
            })
          }
          errorMessage={error.category}
        />
        <LabeledInput
          inputProps={{
            value: title,
            onChangeText: setTitle,
            onFocus: () => clearOnFocus('title'),
            placeholder: 'Título',
            onBlur: () =>
              setError({
                ...error,
                title: false,
              }),
            errorMessage: error.title,
          }}
        />
        <LabeledInput
          inputProps={{
            value: description,
            onChangeText: setDescription,
            onBlur: () =>
              setError({
                ...error,
                description: false,
              }),
            onFocus: () => setError({ ...error, description: false }),
            multiline: true,
            numberOfLines: 4,
            placeholder: 'Deixe sua sugestão aqui',
            errorMessage: error.description,
          }}
        />
        <Text>{actionMessage}</Text>
        <Button
          touchableProps={{
            onPress: handleManifestation,
            background: colors.Blue,
          }}
          textProps={{
            title: 'Enviar Sugestão',
            loading: btnLoading,
          }}
        />
      </>
    );
  }

  return (
    <ScrollableContainer>
      <Container>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size="large"
            color={Gray}
          />
        ) : (
          [renderInfo(), renderSugestion()]
        )}
      </Container>
    </ScrollableContainer>
  );
}

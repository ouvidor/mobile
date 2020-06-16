/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Container } from '../../components';

import Api from '../../services/Api';
import {
  HeaderContainer,
  HeaderButtonContainer,
  HeaderButton,
  HeaderIconContainer,
} from './styles';
import Prefecture from './Prefecture';
import Ombudsman from './Ombudsman';

export default function Prefeitura() {
  const [prefecture, setPrefecture] = useState();
  const [ombudsman, setOmbudsman] = useState();
  const [tab, setTab] = useState(1);
  const [selected, setSelected] = useState(1);

  function renderContent() {
    if (tab === 1) {
      return <Prefecture />;
    }
    return <Ombudsman />;
  }

  function handlePressButton(t, s) {
    setTab(t);
    setSelected(s);
  }

  useEffect(() => {
    const prefecture = Api.get(`/prefecture/${}`);
  }, []);

  return (
    <>
      <HeaderContainer>
        <HeaderButtonContainer>
          <HeaderButton
            position={1}
            selected={selected}
            label="Prefeitura"
            onPress={() => handlePressButton(1, 1)}
          />
          <HeaderButton
            position={2}
            selected={selected}
            label="Ouvidoria"
            onPress={() => handlePressButton(2, 2)}
          />
        </HeaderButtonContainer>
        <HeaderIconContainer>
          <Feather
            color="#eee"
            name={tab === 1 ? 'info' : 'map-pin'}
            size={48}
          />
        </HeaderIconContainer>
      </HeaderContainer>
      <Container noPadding>{renderContent()}</Container>
    </>
  );
}

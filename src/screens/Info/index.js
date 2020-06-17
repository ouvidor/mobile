import React, { useState, useEffect, useContext } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import { Container } from '../../components';
import Prefecture from './Prefecture';
import Ombudsman from './Ombudsman';
import {
  HeaderContainer,
  HeaderButtonContainer,
  HeaderButton,
  HeaderIconContainer,
} from './styles';

export default function Info() {
  const [tab, setTab] = useState(1);
  const [selected, setSelected] = useState(1);
  const [prefecture, setPrefecture] = useState(null);
  const [ombudsman, setOmbudsman] = useState(null);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    async function fetchData() {
      const resolvedSession = await session;

      const data = await Api.get(`/prefecture/${resolvedSession.city}`);

      if (data.ombudsman) {
        setPrefecture(data);
        setOmbudsman(data.ombudsman);
      }
    }

    fetchData();
  }, []);

  function handlePressButton(t, s) {
    setTab(t);
    setSelected(s);
  }

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
          <FeatherIcon
            color="#eee"
            name={tab === 1 ? 'info' : 'map-pin'}
            size={48}
          />
        </HeaderIconContainer>
      </HeaderContainer>
      <Container noPadding>
        {tab === 1 ? (
          <Prefecture prefecture={prefecture} />
        ) : (
          <Ombudsman ombudsman={ombudsman} />
        )}
      </Container>
    </>
  );
}

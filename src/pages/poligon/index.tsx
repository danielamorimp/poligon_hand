import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {
  Page,
  FooteContainer,
  FooteButtonContainer,
  LoginButton,
} from './styles';

const Poligon: React.FC = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {}, []);

  return (
    <Page>
      <FooteContainer>
        <FooteButtonContainer>
          <TextInput
            placeholder="Cor do Cubo"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Cor do Cone"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Cor do Dodecaedro"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </FooteButtonContainer>
        <LoginButton>
          <Text>Aplicar</Text>
        </LoginButton>
      </FooteContainer>
    </Page>
  );
};

export default Poligon;

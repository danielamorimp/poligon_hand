import {Text} from '@react-native-material/core';
import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {
  Page,
  FooteContainer,
  FooteButtonContainer,
  LoginButton,
  Poligon,
  PoligonView,
} from './styles';
import app from '../../config/firebase';
import {addDoc, collection, getDocs, getFirestore} from 'firebase/firestore';

export default function Poligonn({route}) {
  const [userId, setUserId] = useState([]);
  const [cubeColor, setCubeColor] = useState('');
  const [coneColor, setConeColor] = useState('');
  const [dodecaedroColor, setDodecaedroColor] = useState('');
  const [cubeColorScreen, setCubeColorScreen] = useState('');
  const [coneColorScreen, setConeColorScreen] = useState('');
  const [dodecaedroColorScreen, setDodecaedroColorScreen] = useState('');

  const db = getFirestore(app);

  const userCollectionRef = collection(db, route.params.idUser);
  const takeLastRegister = userId[userId.length - 1];

  const handleSaveColors = useCallback(async () => {
    cubeColor !== '' && coneColor !== '' && dodecaedroColor !== ''
      ? (setCubeColorScreen(cubeColor),
        setConeColorScreen(coneColor),
        setDodecaedroColorScreen(dodecaedroColor),
        await addDoc(userCollectionRef, {
          cubeColor,
          coneColor,
          dodecaedroColor,
        }))
      : null;
  }, [coneColor, cubeColor, dodecaedroColor, userCollectionRef]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUserId(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    };
    getUsers();
  }, []);

  return (
    <Page>
      <PoligonView>
        <Poligon
          style={
            cubeColorScreen !== ''
              ? {backgroundColor: cubeColorScreen}
              : takeLastRegister
              ? {backgroundColor: takeLastRegister.cubeColor} : null
          }
        />
        <Poligon
          style={
            coneColorScreen !== ''
              ? {backgroundColor: coneColorScreen}
              : takeLastRegister
              ? {backgroundColor: takeLastRegister.coneColor}
              : null
          }
        />
        <Poligon
          style={
            dodecaedroColorScreen !== ''
              ? {backgroundColor: dodecaedroColorScreen}
              : takeLastRegister
              ? {backgroundColor: takeLastRegister.dodecaedroColor}
              : null
          }
        />
      </PoligonView>
      <FooteContainer>
        <FooteButtonContainer>
          <TextInput
            placeholder="Cor do Cubo"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setCubeColor(text)}
            value={cubeColor.toLowerCase()}
          />
          <TextInput
            placeholder="Cor do Cone"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setConeColor(text)}
            value={coneColor.toLowerCase()}
          />
          <TextInput
            placeholder="Cor do Dodecaedro"
            style={{backgroundColor: 'white', width: '33%', height: 20}}
            onChangeText={text => setDodecaedroColor(text)}
            value={dodecaedroColor.toLowerCase()}
          />
        </FooteButtonContainer>
        <LoginButton
          onPress={() => {
            handleSaveColors();
          }}>
          <Text>Aplicar</Text>
        </LoginButton>
      </FooteContainer>
    </Page>
  );
};

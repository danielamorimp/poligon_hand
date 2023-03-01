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
import Toast from 'react-native-toast-message'
import {addDoc, collection, getDocs, getFirestore} from 'firebase/firestore';

export default function Poligonn({route}) {
  const [color, setColor] = useState([]);
  const [cubeColor, setCubeColor] = useState('');
  const [coneColor, setConeColor] = useState('');
  const [dodecaedroColor, setDodecaedroColor] = useState('');
  const [cubeColorScreen, setCubeColorScreen] = useState('');
  const [coneColorScreen, setConeColorScreen] = useState('');
  const [dodecaedroColorScreen, setDodecaedroColorScreen] = useState('');

  const db = getFirestore(app);

  const dataColection = collection(db, route.params.idUser);
  const takeLastRegister = color[color.length - 1];

  const handleSaveColors = useCallback(async () => {
    cubeColor !== '' && coneColor !== '' && dodecaedroColor !== ''
      ? (setCubeColorScreen(cubeColor),
        setConeColorScreen(coneColor),
        setDodecaedroColorScreen(dodecaedroColor),
        showToast('success', 'SUCESSO', 'CORES APLICADAS E SALVAS'),
        await addDoc(dataColection, {
          cubeColor,
          coneColor,
          dodecaedroColor,
        }))
      : showToast('error', 'ERRO', 'PREENCHA TODOS OS CAMPOS');
  }, [coneColor, cubeColor, dodecaedroColor, dataColection]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dataColection);
      setColor(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    };
    getUsers();
  }, []);

  const showToast = (type, title, body) => {
    Toast.show({
      type: type,
      text1: title,
      text2: body,
    });
  };

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
      <Toast />
    </Page>
  );
};

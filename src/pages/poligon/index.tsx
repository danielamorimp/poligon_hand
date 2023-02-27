import { Text } from "@react-native-material/core";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  Page,
  FooteContainer,
  FooteButtonContainer,
  LoginButton,
  Poligon,
  PoligonView
} from "./styles";
import app from "../../config/firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

export default function Poligonn({ route }) {
  const [userId, setUserId] = useState([]);
  const [color, setColor] = useState(false);
  const [cubeColor, setCubeColor] = useState('');
  const [coneColor, setConeColor] = useState('');
  const [dodecaedroColor, setDodecaedroColor] = useState('');

  const db = getFirestore(app);

  const userCollectionRef = collection(db, route.params.idUser);
  const takeLastRegister = userId[userId.length - 1];

  const handleSaveColors = useCallback(async () => {
    await addDoc(userCollectionRef, {
      cubeColor,
      coneColor,
      dodecaedroColor,
    });
  }, [userCollectionRef, cubeColor, coneColor, dodecaedroColor]);

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
            takeLastRegister === undefined
              ? {backgroundColor: cubeColor}
              : {backgroundColor: takeLastRegister.cubeColor}
          }
        />
        <Poligon
          style={
            takeLastRegister === undefined
              ? {backgroundColor: coneColor}
              : {backgroundColor: takeLastRegister.coneColor}
          }
        />
        <Poligon
          style={
            takeLastRegister === undefined
              ? {backgroundColor: dodecaedroColor}
              : {backgroundColor: takeLastRegister.dodecaedroColor}
          }
        />
      </PoligonView>
      <FooteContainer>
        <FooteButtonContainer>
          <TextInput
            placeholder="Cor do Cubo"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setCubeColor(text)}
            value={cubeColor.toLowerCase()}
          />
          <TextInput
            placeholder="Cor do Cone"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setConeColor(text)}
            value={coneColor.toLowerCase()}
          />
          <TextInput
            placeholder="Cor do Dodecaedro"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setDodecaedroColor(text)}
            value={dodecaedroColor.toLowerCase()}
          />
        </FooteButtonContainer>
        <LoginButton
          onPress={() => {
            handleSaveColors();
            setColor(true);
          }}>
          <Text>Aplicar</Text>
        </LoginButton>
      </FooteContainer>
    </Page>
  );
};

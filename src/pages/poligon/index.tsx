import { Text } from "@react-native-material/core";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  Page,
  FooteContainer,
  FooteButtonContainer,
  LoginButton,
} from './styles';
import app from "../../config/firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const Poligon: React.FC = () => {
  const [userId, setUserId] = useState([]);
  const [cubeColor, setCubeColor] = useState('');
  const [coneColor, setConeColor] = useState('');
  const [dodecaedroColor, setDodecaedroColor] = useState('');

  const db = getFirestore(app);

  const userCollectionRef = collection(db, "colors");

  const handleSaveColors = useCallback(async () => {
    await addDoc(userCollectionRef, {
      cubeColor,
      coneColor,
      dodecaedroColor,
    });
  }, [coneColor, cubeColor, dodecaedroColor, userCollectionRef]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <Page>
      <FooteContainer>
        <FooteButtonContainer>
          <TextInput
            placeholder="Cor do Cubo"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setCubeColor(text)}
            value={cubeColor}
          />
          <TextInput
            placeholder="Cor do Cone"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setConeColor(text)}
            value={coneColor}
          />
          <TextInput
            placeholder="Cor do Dodecaedro"
            style={{ backgroundColor: "white", width: "33%", height: 20 }}
            onChangeText={(text) => setDodecaedroColor(text)}
            value={dodecaedroColor}
          />
        </FooteButtonContainer>
        <LoginButton onPress={handleSaveColors}>
          <Text>Aplicar</Text>
        </LoginButton>
      </FooteContainer>
    </Page>
  );
};

export default Poligon;

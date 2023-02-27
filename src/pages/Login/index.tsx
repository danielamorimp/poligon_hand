import React, { useEffect, useState } from "react";
import { Text, TextInput } from "@react-native-material/core";
import auth from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Page,
  LoginButton,
  ButtonView,
  AppNameView,
  AppName,
  TextError,
    ErrorView,
} from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setErrorLogin(false);
        const user = userCredential.user;
        navigation.reset({
          index: 0,
          routes: [{ name: "Poligon" }],
        });
      })
      .catch(error => {
        setErrorLogin(true);
      });
  };

  useEffect(() => {}, []);

  return (
    <Page>
      <AppNameView>
        <AppName>Poligon</AppName>
      </AppNameView>
      <TextInput
        label="Email"
        style={{ margin: 16 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        color={"black"}
      />
      <TextInput
        label="Senha"
        secureTextEntry={true}
        style={{ margin: 16 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        color={"black"}
      />
      <ButtonView>
        <LoginButton onPress={login}>
          <Text>Login</Text>
        </LoginButton>
      </ButtonView>
      {errorLogin && (
        <ErrorView>
          <TextError>Email ou senha incorreto</TextError>
        </ErrorView>
      )}
    </Page>
  );
};

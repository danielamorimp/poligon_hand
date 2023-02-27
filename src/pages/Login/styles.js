import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #dae5f0;
  justify-content: center;
`;

export const ButtonView = styled.View`
  align-items: center;
`;

export const AppNameView = styled.View`
  align-items: center;
`;

export const ErrorView = styled.View`
  align-items: center;
  padding: 50px;
`;

export const TouchableOpacityTextInput = styled.TouchableOpacity`
  border-width: 1px;
  padding: 5px 0 0 14px;
  border-style: solid;
  border-color: red;
  border-radius: 6px;
  width: 338px;
`;

export const LoginButton = styled.TouchableOpacity`
  border-width: 1px;
  align-items: center;
  width: 200px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
`;

export const AppName = styled.Text`
  font-size: 50px;
  font-weight: 700;
`;
export const TextError = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: red;
`;

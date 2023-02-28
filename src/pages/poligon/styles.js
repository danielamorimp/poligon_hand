import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  background-color: black;
`;

export const FooteButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
`;

export const FooteContainer = styled.View`
  flex: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 50px;
`;

export const Poligon = styled.View`
  background-color: white;
  height: 80px;
  width: 80px;
  justify-content: space-between;
  padding-top: 200px;
`;

export const PoligonView = styled.View`
  flex: 1;
  align-items: center;
  padding-bottom: 50px;
  justify-content: center ;
`;

export const LoginButton = styled.TouchableOpacity`
  border-width: 1px;
  align-items: center;
  width: auto;
  background-color: white;
  height: 40px;
  justify-content: center;
`;

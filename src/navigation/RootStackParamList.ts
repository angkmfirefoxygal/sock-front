// src/navigation/RootStackParamList.ts
export type RootStackParamList = {
  VerifyMnemonic: { mnemonic: string[] }; // 니모닉 배열도 함께 받아야함
  GenerateMnemonic: undefined; 
  Main: undefined;
  ReceiveToken: undefined;
  SendToken: undefined;
  SelectAmount:undefined;
  QRScanner:undefined;
};
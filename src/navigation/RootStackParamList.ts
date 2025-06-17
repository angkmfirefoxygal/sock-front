// src/navigation/RootStackParamList.ts
export type RootStackParamList = {
  SetPassword: undefined;
  EnterPassword: undefined;
  WalletStart: undefined;
  VerifyMnemonic: { mnemonic: string[] }; // 니모닉 배열도 함께 받아야함
  GenerateMnemonic: undefined; 
  Main: undefined;
  ReceiveToken: undefined;
  SendToken: undefined;
  SelectAmount: {
    toAddress:string; // SendToken에서 To 주소 받기 
  };
  QRScanner:undefined;
  ConfirmSend: {
    amount: string;
    token: string;
    toAddress: string;
    gasFee : string;
    balance : string;
  };
  HelpScreen: undefined;
};

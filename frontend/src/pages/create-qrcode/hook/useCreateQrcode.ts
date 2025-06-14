import { useState } from "react";

interface IStateQrCode {
  url: string;
  size: number;
  logoFile?: string;
  bgColor?: string;
  fgColor: string;
}

export const useCreateQrCode = () => {
  const [qrCodeState, setQRrCodeState] = useState<IStateQrCode>({
    url: "https://google.com",
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    size: 300,
  });

  const changeQrCodeState = (data: Partial<IStateQrCode>) => {
    setQRrCodeState({
      ...qrCodeState,
      ...data,
    });
  };

  return {
    states: { qrCodeState },
    actions: { setQRrCodeState, changeQrCodeState },
  };
};

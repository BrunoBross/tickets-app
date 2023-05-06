import QRCodeStyled from "react-native-qrcode-styled";
import colors from "tailwindcss/colors";

interface QRCodeProps {
  data: string;
}

export default function QRCode(props: QRCodeProps) {
  const { data } = props;

  return (
    <QRCodeStyled
      data={data}
      pieceSize={8}
      color={colors.white}
      gradient={{
        options: {
          colors: [colors.violet[700], colors.violet[100]],
        },
      }}
      pieceBorderRadius={5}
      isPiecesGlued
    />
  );
}

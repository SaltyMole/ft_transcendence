import { generateSecret, generate, verify, generateURI} from "otplib";
import QRCode from 'qrcode'



// Generate a secret
export const generateTotpSecret = (): string => generateSecret()



export const generateQrCode = async (otpauthUrl: string): Promise<string> =>
  QRCode.toDataURL(otpauthUrl)

// Generate QR code URI for authenticator apps

export const generateOtpauthUrl = (email: string, secret: string): string => generateURI({
  issuer: "ft_transcendence",
  label: email,
  secret,
});


export const verifyTotpCode = async (token: string, secret: string): Promise<boolean> => {
  try {
    const result = await verify({ secret, token });
    return (result.valid);
  } catch {
    return false;
  }
};

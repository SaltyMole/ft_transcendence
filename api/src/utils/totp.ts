import * as otplib from 'otplib';
import QRCode from 'qrcode';

const { generateSecret, generateURI, verifySync } = otplib;

export const generateTotpSecret = (): string => generateSecret();

export const generateQrCode = async (otpauthUrl: string): Promise<string> =>
  QRCode.toDataURL(otpauthUrl);

export const generateOtpauthUrl = (email: string, secret: string): string => 
  generateURI({
    secret,
    label: email,
    issuer: 'ft_transcendence'
  });

export const verifyTotpCode = (token: string, secret: string): boolean => {
  try {
    const result = verifySync({ token, secret });
    return result?.valid === true;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
};
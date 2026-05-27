import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export const generateTotpSecret = (): string => authenticator.generateSecret()

export const generateOtpauthUrl = (email: string, secret: string): string =>
  authenticator.keyuri(email, 'ft_transcendence', secret)

export const generateQrCode = async (otpauthUrl: string): Promise<string> =>
  QRCode.toDataURL(otpauthUrl)

export const verifyTotpCode = (token: string, secret: string): boolean => {
  try {
    return authenticator.verify({ token, secret })
  } catch {
    return false
  }
}

import { generateSecret, generate, verify, generateURI } from "otplib";

// Generate a secret
const secret = generateSecret();

// Generate a TOTP token
const token = await generate({ secret });

// Verify a token — returns VerifyResult, not a boolean
const result = await verify({ secret, token });
console.log(result.valid); // true or false

// Generate QR code URI for authenticator apps

const uri = (email: string, secret: string): string => generateURI({
  issuer: "ft_transcendence",
  label: email,
  secret,
});
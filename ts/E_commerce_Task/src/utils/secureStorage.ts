import SecureLS from "secure-ls";

const secretKey = import.meta.env.VITE_APP_SECRET_KEY as string;

// 👇 THIS is the real fix
const ls = new (SecureLS as any).default({
  encodingType: "aes",
  encryptionSecret: secretKey,
});

export default ls;
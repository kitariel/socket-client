import crypto from "crypto";

export const log = (module_name: string) => () =>
  `[${new Date().toISOString()}][${module_name}]:`;

export const serializeToJSON = (literal: any) => JSON.stringify(literal);

export const deserializeFromJSON = (json_string: string) =>
  JSON.parse(json_string);

export const encrypt = (
  val: string,
  encryption_key: string,
  encryption_iv: string
) => {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    encryption_key,
    encryption_iv
  );
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const decrypt = (
  encrypted: string,
  encryption_key: string,
  encryption_iv: string
) => {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    encryption_key,
    encryption_iv
  );
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};
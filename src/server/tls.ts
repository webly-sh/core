export const getOptions = (
  hostname: string,
  certbotDir: string
): Deno.TlsCertifiedKeyPem => {
  const options = {
    cert: `${certbotDir}/live/${hostname}/fullchain.pem`,
    key: `${certbotDir}/live/${hostname}/privkey.pem`,
  };

  return options;
};

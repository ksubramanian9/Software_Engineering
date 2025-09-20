export const FIRM_NAME = "Brightscale Partners";

const endsWithS = /s$/i;
export const FIRM_NAME_POSSESSIVE = endsWithS.test(FIRM_NAME)
  ? `${FIRM_NAME}'`
  : `${FIRM_NAME}'s`;


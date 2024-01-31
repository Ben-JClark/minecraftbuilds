type ValidationResult = {
  isValid: boolean;
  entryFeild?: string;
  errorMessage?: string;
};

function validVarchar(input: string, minLength: number, maxLength: number) {}

function validUnsignedSmallInt(input: number) {}

function validUnsignedMediumInt(input: number) {}

export { validVarchar, validUnsignedSmallInt, validUnsignedMediumInt };
export type { ValidationResult };

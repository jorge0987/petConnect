import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class CnpjValidator implements ValidatorConstraintInterface {
  validate(cnpj: string): boolean {
    // Remove todos os caracteres que não são números do CNPJ
    cnpj = cnpj.replace(/\D/g, "");

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;

    // Verifica o primeiro dígito verificador
    if (digito1 !== parseInt(cnpj.charAt(12))) {
      return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica o segundo dígito verificador
    if (digito2 !== parseInt(cnpj.charAt(13))) {
      return false;
    }

    // Se chegou aqui, o CNPJ é válido
    return true;
  }
}

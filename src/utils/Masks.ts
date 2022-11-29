export interface IMask {
  value: 'cpf' | 'cnpj' | 'date' | 'telefone' | 'celular';
}

interface IMaskCPFeCNPJ {
  valueModify: string;
  typeDocument: 'pf' | 'pj';
}

export const Masks = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  date: '99/99/9999',
  telefone: '(99) 9999-9999',
  celular: '(99) 9999-99999',
};

export const isCPForCNPJ = (value: string): 'pf' | 'pj' => {
  let valueModify = value.replace(/\D/g, '');
  const length = valueModify.length;

  if (length < 14) {
    return 'pf';
  } else {
    return 'pj';
  }
};

export const MaskCPFeCNPJ = (value: string): IMaskCPFeCNPJ => {
  try {
    const length = value.length;
    let typeDocument: 'pj' | 'pf' = 'pf';
    let valueModify = value.replace(/\D/g, '');

    if (length <= 14) {
      //Coloca um ponto entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d)/, '$1.$2');

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      valueModify = valueModify.replace(/(\d{3})(\d)/, '$1.$2');

      //Coloca um hífen entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      typeDocument = 'pf';
    } else {
      //Coloca ponto entre o segundo e o terceiro dígitos
      valueModify = valueModify.replace(/^(\d{2})(\d)/, '$1.$2');

      //Coloca ponto entre o quinto e o sexto dígitos
      valueModify = valueModify.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');

      //Coloca uma barra entre o oitavo e o nono dígitos
      valueModify = valueModify.replace(/\.(\d{3})(\d)/, '.$1/$2');

      //Coloca um hífen depois do bloco de quatro dígitos
      valueModify = valueModify.replace(/(\d{4})(\d)/, '$1-$2');
      typeDocument = 'pj';
    }

    return { valueModify, typeDocument };
  } catch (error) {
    let valueModify = value;
    let typeDocument: 'pj' | 'pf' = 'pf';
    return { valueModify, typeDocument };
  }
};

export const isReal = (value: string): any => {
  var valor = value;

  try {
    valor = valor + '';
    valor = valor.replace(/[\D]+/g, '');
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ',$1');

    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }

    return valor;
  } catch {
    return valor;
  }
};

export const ClearString = (value: string): any => {
  let valueModify = value.replace(/\D/g, '');
  return valueModify;
};

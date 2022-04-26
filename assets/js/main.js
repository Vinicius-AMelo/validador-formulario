class ValidaCpf {
    constructor(cpf) {
        this.cpf = cpf
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpf.replace(/\D+/g, '')
        }
        );
    }
    criaComparador() {
        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const digito1 = this.criaDig(cpfParcial)
        const digito2 = this.criaDig(cpfParcial + digito1)
        const comparador = cpfParcial + digito1 + digito2;
        return comparador;
    }
    criaDig(cpfParcial) {
        const cpfArray = Array.from(cpfParcial)
        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, valor) => {
            ac += (valor * regressivo)
            regressivo--
            return ac;
        }, 0)
        const digito = 11 - (total % 11)
        return digito > 9 ? 0 : digito;
    }
    validador(comparador) {
        comparador = this.criaComparador();
        if (this.cpf.length !== 11) {
            console.log(`Ta me tirando?`)
            return false;
        } else if (comparador === this.cpfLimpo) {
            console.log(`Mandou bem cavalo, ${this.cpf} é válido`)
            return true;
        } else {
            console.log(`Mandou mal cavalo, falsificou o CPF: ${this.cpf}`)
            return false;
        }
    }
}

const cpf1 = new ValidaCpf('1684083176')
// const cpf2 = new ValidaCpf('372.791.430-08')
cpf1.validador()
// cpf2.validador()
// console.log(cpf1.cpf)
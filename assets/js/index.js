class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.form');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.travaSubmit(e);
        });
    }

    travaSubmit(e) {
        e.preventDefault();

        const camposValidos = this.camposValidos();
        const senhasValidas = this.senhasValidas()
        if (camposValidos && senhasValidas) {
            this.formulario.submit()
        }
    }

    camposValidos() {
        let valid = true;

        for (let error of this.formulario.querySelectorAll('.error-text')) {
            error.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            console.log(label)

            if (!campo.value) {
                this.criaErro(campo, `O Campo "${label}" não pode ficar em branco`)
                valid = false;
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }
        }


        return valid;
    }

    validaUsuario(campo) {
        const campoUsuario = campo.value;

        let valid = true;

        if (campoUsuario.length < 3 && campoUsuario || campoUsuario.length > 12 && campoUsuario) {
            this.criaErro(campo, 'O "Usuário precisa ter entre 3 e 12 caracteres"')
            valid = false;
        }
        if (!campoUsuario.match(/^[a-zA-Z0-9]+$/g) && campoUsuario) {
            this.criaErro(campo, 'O "Usuário só pode conter letras e números"')
            valid = false
        }

        return valid;
    }

    validaCPF(campo) {
        let valid = true;
        const validador = new ValidaCpf(campo.value)
        if (!validador.validador()) {
            this.criaErro(campo, 'O CPF é invalido')
            valid = false;
        }

        return valid;
    }

    senhasValidas(){
        const senha = this.formulario.querySelector('.senha');
        const senhaRepetida = this.formulario.querySelector('.repetir-senha');
        const campoSenha = senha.value;
        const campoSenhaR = senhaRepetida.value;
        let valid = true;

        if ((campoSenha.length <3 && campoSenha) || (campoSenha.length > 12 && campoSenha)){
            this.criaErro(senha, 'A senha deve conter entre 3 e 12 caracteres')
            valid = false;
        }
        if(campoSenha !== campoSenhaR){
            this.criaErro(senhaRepetida, 'Campo "Senha" e "Repetir Senha" precisam ser iguais')
            valid = false;
        }
            return valid;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidaFormulario();
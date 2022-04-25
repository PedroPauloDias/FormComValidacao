class Validator {
  constructor() {
    this.validations = [
      'data-required',
      'data-min-length',
      'data-max-length',
      'data-email-validate',
      'data-only-letters',
      'data-equal',
      "data-password-validation",
      
    ]
  }

  //iniciar a validação de todos os campos

  validate(form) {

    // Resgata todas as validações
    let currentValidations = document.querySelectorAll('form .error-validation');

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }

    // pegar os inputs
    let inputs = form.getElementsByTagName('input'); 

    // transformar HTMLcollection -> array ->
    let inputsArray = [...inputs];
 

    // loop nos inputs e validação mediante ao que for encontrado 
    inputsArray.forEach(function(input) {
  
      // loop em todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          
          // limpando a string para virar um metodo
          let method = this.validations[i].replace('data-', '').replace('-', '')

          // valor do input
          let value = input.getAttribute(this.validations[i]);

          // invocar o method
          this[method](input, value);
        }
      }
    
    },this);

  }
  // verifica se o input tem um numero minimo de caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres `;
    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);

    }
  }
//   verifica se o input passou do maximo de caracteres
  maxlength(input, maxValue) { 
    let inputLength = input.value.length;
    let errorMessage = `O campo precisa ter no máximo ${maxValue} caracteres `;
    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);

    }

  }
  emailvalidate(input) {
    // email@email.com
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão nome@provedor.com`;
    if (!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
    
  }
  // valida se o campo tem apenaas letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;
    let inputValue = input.value;
    let errorMessage = `Este campo nao aceita numeros e nem caracteres especiais`

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }
    
  }
  //   verifica se dois campos sao iguais
  equal(input, inputname) {
    let inputToCompare = document.getElementsByName(inputname)[0];

    let errorMessage = `Este campo precisa ser igual ao ${inputname}`;
    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }


  //   validação para o campo de senha
  passwordvalidation(input) {

    // transformar a string em um Array
    let charArr = input.value.split("");
    let uppercase = 0;
    let numbers = 0;
    for (let i = 0; charArr.length > i; i++){
      if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercase++;

      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }
    if (uppercase === 0 || numbers === 0) {
      let errorMessage = `A senha precisa de pelo menos uma letra maiúscula e um numero`
      this.printMessage(input, errorMessage);
    }



  }



  // metodo para imprimir as msgs de erro na tela 
  printMessage(input, msg) {

    // verificar a quantidadde de erros de validação
    let errorQty = input.parentNode.querySelector('.error-validation');

    if(errorQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);
    
      template.textContent = msg;

      // achar aonde  vou colocar a msg de erro , pq o input nao aceita
      let inputParent = input.parentNode;
      template.classList.remove('template');

      inputParent.appendChild(template);
    }
  }

  // Verifica se o input é requerido
  required(input) {

    let inputValue = input.value 

    if (inputValue === '') {
      let errorMessage = 'Este campo é obrigatório'
      this.printMessage(input, errorMessage);
    }
  }

// limpa as validações da tela
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }



}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function(e) {

  
  e.preventDefault();
  

  validator.validate(form);

})
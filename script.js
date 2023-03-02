const controls = document.querySelector(".controls");
const inputContainer = document.querySelector(".input_container");
const resultContainer = document.querySelector(".result_container");
const operatorElement = inputContainer.querySelector(".operator");
const variable_1_Element = inputContainer.querySelector(".variable_1");
const variable_2_Element = inputContainer.querySelector(".variable_2");
const equalsSignElement = inputContainer.querySelector(".equals_sign");
const state = {
   currentVariable: variable_1_Element,
   operatorPresent: false,
   resultPresent: false,
   isCurrentVariableEmpty: function () {
      if (this.currentVariable.textContent === "") {
         return true;
      } else {
         return false;
      }
   }
};
//* listener related to keydown presses
document.addEventListener("keydown", (e) => {
   let keyCode = e.code;
   let shiftKeyActive = e.shiftKey;
   console.log(keyCode);
   if (shiftKeyActive === true) {
      if (keyCode.includes("Equal")) {
         return appendOperator("+");
      }
      if (keyCode.includes("Digit8")) {
         return appendOperator("x");
      }
   } else {
      if (keyCode.includes("Backspace")) {
         return removeLastCharacter();
      }
      if (keyCode.includes("Digit")) {
         let number = keyCode.replace("Digit", "");
         return appendNumberToInput(number);
      }
      if (keyCode.includes("Period")) {
         return appendNumberToInput(".");
      }
      if (keyCode.includes("Minus")) {
         return appendOperator("-");
      }

      if (keyCode.includes("Slash")) {
         return appendOperator("/");
      }
      if (keyCode.includes("KeyX")) {
         return appendOperator("x");
      }
      if (keyCode.includes("Equal")) {
         return calculateInputs();
      }
      /*  if(keyCode.includes('Enter')){
             return calculateInputs()
         } */
   }
});
controls.addEventListener("click", (e) => {
   let target = e.target;
   if (target.matches("button")) {
      initControl(target);
   }
});

function initControl(button) {
   let controlType = button.className;
   console.log(controlType);
   if (controlType === "equals") {
      return calculateInputs();
   }
   if (controlType === "decimal") {
      appendNumberToInput(button.textContent);
   }
   if (controlType === "number") {
      appendNumberToInput(button.textContent);
   }
   if (controlType === "operator") {
      appendOperator(button.textContent);
   }

   if (controlType === "control") {
      controlCalc(button.textContent);
   }
}

function controlCalc(controlType) {
   if (controlType === "AC") {
      clearResults();
   }
   if (controlType === "DEL") {
      removeLastCharacter();
   }
}

function removeLastCharacter() {
   console.log(variable_1_Element.textContent);
   if (resultContainer.textContent !== "") {
      state.resultPresent = false;
      equalsSignElement.style.display = "none";
      return (resultContainer.textContent = "");
   }
   if (variable_2_Element.textContent !== "") {
      return (variable_2_Element.textContent = variable_2_Element.textContent.slice(
         0,
         -1
      ));
   }
   if (operatorElement.textContent !== "") {
      state.currentVariable = variable_1_Element;
      state.operatorPresent = false;
      return (operatorElement.textContent = variable_2_Element.textContent.slice(
         0,
         -1
      ));
   }
   if (variable_1_Element.textContent !== "") {
      return (variable_1_Element.textContent = variable_1_Element.textContent.slice(
         0,
         -1
      ));
   }
}

function clearResults() {
   variable_1_Element.textContent = "";
   operatorElement.textContent = "";
   variable_2_Element.textContent = "";
   resultContainer.textContent = "";

   state.currentVariable = variable_1_Element;
   equalsSignElement.style.display = "none";
   state.resultPresent = false;
   state.operatorPresent = false;
}

function calculateInputs() {
   let firstNumber = parseFloat(variable_1_Element.textContent);
   let operator = operatorElement.textContent;
   if (operator === "") {
      return;
   }

   let variable2Value = variable_2_Element.textContent;
   if (
      variable2Value === "" ||
      variable2Value === "-" ||
      variable2Value === "+"
   ) {
      variable_2_Element.textContent = 0;
   }
   let secondNumber = parseFloat(variable_2_Element.textContent);
   let result;
   if (operator === "+") {
      result = firstNumber + secondNumber;
   }
   if (operator === "-") {
      result = firstNumber - secondNumber;
   }
   if (operator === "x") {
      result = firstNumber * secondNumber;
   }
   if (operator === "/") {
      result = firstNumber / secondNumber;
   }
   resultContainer.textContent = result;
   equalsSignElement.style.display = "block";
   state.resultPresent = true;
}

function appendNumberToInput(number) {
   if (state.resultPresent) {
      clearResults();
   }
   state.currentVariable.textContent =
      state.currentVariable.textContent + number;
}

function createNewVariableInputs(operator) {
   let result = resultContainer.textContent;
   resultContainer.textContent = "";
   variable_1_Element.textContent = result;
   operatorElement.textContent = operator;
   variable_2_Element.textContent = "";
   equalsSignElement.style.display = "none";
   state.resultPresent = false;
}

function appendOperator(operator) {
   let currentVariable = state.currentVariable;
   if (state.resultPresent) {
      calculateInputs();
      return createNewVariableInputs(operator);
   }

   if (
      currentVariable.classList.contains("variable_1") &&
      state.isCurrentVariableEmpty()
   ) {
      if (operator === "-" || operator === "+") {
         return (variable_1_Element.textContent = operator);
      } else {
         return;
      }
   }

   if (
      state.operatorPresent === true &&
      currentVariable.classList.contains("variable_2") &&
      state.isCurrentVariableEmpty()
   ) {
      if (operator === "-" || operator === "+") {
         return (variable_2_Element.textContent = operator);
      } else {
         return;
      }
   }

   if (state.operatorPresent === true && !state.isCurrentVariableEmpty()) {
      calculateInputs();
      return createNewVariableInputs(operator);
   }
   state.operatorPresent = true;
   operatorElement.textContent = operator;
   state.currentVariable = variable_2_Element;
}

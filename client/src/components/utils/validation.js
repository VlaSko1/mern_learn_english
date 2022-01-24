export const changeName = (event, ) => { // TODO пока не стал выносить
  let text = event.target.value;
  closeSnackError();
  if (text.search(/[^\w-]/g) !== -1) {
    setTextSnackError('Поле name может содержать только латинский буквы, цифры, дефис и символ подчёркивания!');
    setIsSnackErrorOpen(true);
  }
  text = text.replace(/[^\w-]/g, '');
  setName(text);
};
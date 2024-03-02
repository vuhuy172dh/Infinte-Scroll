const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (this: any) {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export default debounce;

export const delay = () => {
  let timer;
  return (callback, ms) => {
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
};
export function setTimeFormat(time) {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;

  return `${hours === 0 ? '' : `${hours}ч` } ${minutes}м`;
}

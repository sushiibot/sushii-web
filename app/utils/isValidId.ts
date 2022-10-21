const ID_REGEX = /\d{17,20}/;

export default function isValidId(idStr: string): boolean {
  return ID_REGEX.test(idStr);
}

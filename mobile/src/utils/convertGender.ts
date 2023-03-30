export enum GenderEnum {
  MALE,
  FEMALE,
  OTHER,
}

export default function convertGenter(gender: GenderEnum) {
  switch (gender) {
    case GenderEnum.MALE:
      return "Masculino";
    case GenderEnum.FEMALE:
      return "Feminino";
    default:
      return "Unissex";
  }
}

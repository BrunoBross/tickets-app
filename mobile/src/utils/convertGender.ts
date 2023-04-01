export enum GenderEnum {
  MALE,
  FEMALE,
  OTHER,
}

export default function convertGenter(gender: String) {
  switch (GenderEnum[gender as keyof typeof GenderEnum]) {
    case GenderEnum.MALE:
      return "Masculino";
    case GenderEnum.FEMALE:
      return "Feminino";
    default:
      return "Unissex";
  }
}

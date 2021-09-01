export const formatObjectMap = <T extends { [key: string]: unknown }>(
  obj: Map<string, T>,
  primaryKey: string
) => {
  const array: Record<string, unknown>[] = [];

  obj.forEach((value, key) => {
    array.push({
      [primaryKey]: key,
      ...value,
    });
  });

  return array;
};

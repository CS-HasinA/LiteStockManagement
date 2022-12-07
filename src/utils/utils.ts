const getOnlyUniqueValues = <T>(arr: T[]): T[] => [...new Set(arr)];

  export { getOnlyUniqueValues  }
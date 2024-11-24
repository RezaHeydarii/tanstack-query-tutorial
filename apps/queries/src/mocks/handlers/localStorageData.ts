/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageData = (key: string, defaultValue: any[]) => {
  const setData = (newData: any[]) => {
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const getData = () => {
    const inStorage = localStorage.getItem(key);

    return inStorage ? (JSON.parse(inStorage) as any[]) : defaultValue;
  };

  return {
    getData,
    setData,
  };
};

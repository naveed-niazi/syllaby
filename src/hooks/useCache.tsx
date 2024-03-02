const useCache = () => {
  const isSessionStorageAvailable = () => {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  const save = <T,>(key: string, data: T, expiryDays: number = 1) => {
    if (!isSessionStorageAvailable()) {
      console.error('SessionStorage is not available.');
      return;
    }

    try {
      const now = new Date();
      const item = {
        value: data,
        expiry: now.getTime() + expiryDays * 24 * 60 * 60 * 1000,
      };
      sessionStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving data to sessionStorage:', error);
    }
  };

  const load = <T,>(key: string): T | null => {
    if (!isSessionStorageAvailable()) {
      console.error('SessionStorage is not available.');
      return null;
    }

    try {
      const itemStr = sessionStorage.getItem(key);
      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Error loading data from sessionStorage:', error);
      return null;
    }
  };

  return { save, load };
};

export default useCache;

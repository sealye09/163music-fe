export const useLocalStorage = (key: string) => {
	const getLocalStorage: any = () => {
		const local = localStorage.getItem(key);

		if (local != null) {
			return JSON.parse(local);
		}
		return null;
	};

	const setLocalStorage = (value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const removeLocalStorage: any = () => {
		return localStorage.removeItem(key);
	};

	return [getLocalStorage, setLocalStorage, removeLocalStorage];
};

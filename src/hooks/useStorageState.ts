export const useStorageState = (key: string): [string | null, (state: string | null | undefined) => void] => {
    const state = localStorage.getItem(key);
    const setState = (e: string | null | undefined) => {
        if (e === null || e === undefined) {
            return localStorage.removeItem(key);
        }
        localStorage.setItem(key, e);
    }
    return [state, setState]
}


export default useStorageState;
import React, {createRef} from "react";

export const useSubmitButtonRef = (): [React.RefObject<HTMLButtonElement>, VoidFunction] => {
    const submitButtonRef = createRef<HTMLButtonElement>();
    const handleClick = () => submitButtonRef?.current?.click && submitButtonRef.current.click()
    return [submitButtonRef, handleClick];
}

export default useSubmitButtonRef;
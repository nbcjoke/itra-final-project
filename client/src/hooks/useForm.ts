// import { useCallback, useState } from "react";

// export const useForm = (initialValues: {}) => {
//   const [formValues, setFormValues] = useState(initialValues);
//   const handleChange = useCallback(({ target }) => {
//     const { value, name } = target;

//     setFormValues((state) => ({
//       ...state,
//       [name]: value,
//     }));
//   }, []);
//   const handleReset = useCallback(() => {
//     setFormValues(initialValues);
//   }, []);

//   return { formValues, handleReset, handleChange };
// };

export {};

import { useCallback, useState } from "react";

export const useForm = (initialValues: any) => {
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = useCallback(({ target }: any) => {
    const { value, name } = target;

    setFormValues((state: any) => ({
      ...state,
      [name]: value,
    }));
  }, []);
  const handleReset = useCallback(() => {
    setFormValues(initialValues);
  }, []);

  return { formValues, handleReset, handleChange };
};

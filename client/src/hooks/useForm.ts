import { useCallback, useState } from "react";

export const useForm = (initialValues: any) => {
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = useCallback((changes: any) => {
    setFormValues((state: any) => ({
      ...state,
      ...changes,
    }));
  }, []);
  const handleReset = useCallback(() => {
    setFormValues(initialValues);
  }, []);

  return { formValues, handleReset, handleChange };
};

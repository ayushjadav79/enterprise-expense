import React, { createContext, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState({});

  const registerForm = (name, initialValues, validationSchema, onSubmit) => {
    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object().shape(validationSchema),
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          await onSubmit(values);
          resetForm();
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setSubmitting(false);
        }
      },
    });

    setForms(prev => ({
      ...prev,
      [name]: formik,
    }));

    return formik;
  };

  const getForm = (name) => {
    return forms[name];
  };

  const resetForm = (name) => {
    if (forms[name]) {
      forms[name].resetForm();
    }
  };

  const setFormFieldValue = (name, field, value) => {
    if (forms[name]) {
      forms[name].setFieldValue(field, value);
    }
  };

  const setFormFieldTouched = (name, field, touched = true) => {
    if (forms[name]) {
      forms[name].setFieldTouched(field, touched);
    }
  };

  const setFormFieldError = (name, field, error) => {
    if (forms[name]) {
      forms[name].setFieldError(field, error);
    }
  };

  const validateForm = async (name) => {
    if (forms[name]) {
      return await forms[name].validateForm();
    }
    return {};
  };

  const submitForm = async (name) => {
    if (forms[name]) {
      return await forms[name].submitForm();
    }
    return false;
  };

  const value = {
    forms,
    registerForm,
    getForm,
    resetForm,
    setFormFieldValue,
    setFormFieldTouched,
    setFormFieldError,
    validateForm,
    submitForm,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export default FormContext; 
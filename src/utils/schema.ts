import * as yup from 'yup';

export const studentSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name.')
    .test('two-word', 'Please enter at least two words', (value: string | undefined): boolean => {
      if (!value) return false;

      const parts = value?.split(' ') || [];
      return parts.filter((x: string) => !!x).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer.')
    .required('Please enter age.')
    .typeError('Please enter a valid number.'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark.')
    .typeError('Please enter a valid number.'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select either male or female or other')
    .required('Please select gender.'),
  city: yup.string().required('Please select city'),
});

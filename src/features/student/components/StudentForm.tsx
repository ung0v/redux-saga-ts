import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { studentSchema } from 'utils';
import Alert from '@mui/material/Alert';

export interface StudentFormProps {
  initialValues: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(studentSchema),
  });

  const cityOptions = useAppSelector(selectCityOption);

  const handleFormSubmit = async (formValues: Student) => {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 3000);
    // });
    // console.log('submit: ', formValues);
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          options={[
            {
              label: 'Male',
              value: 'male',
            },

            {
              label: 'Female',
              value: 'female',
            },
            {
              label: 'Other',
              value: 'other',
            },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        <SelectField name="city" control={control} label="City" options={cityOptions} />
        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            // loadingPosition="start"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}

import { FormHelperText, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: string | number;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export default function RadioGroupField({
  name,
  control,
  label,
  disabled,
  options,
}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <FormControl margin="normal" error={invalid} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      {error?.message && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

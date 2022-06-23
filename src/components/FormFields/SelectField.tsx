import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: string | number;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export default function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      size="small"
      disabled={disabled}
      error={!!error?.message}
    >
      <InputLabel id={`${name}__label`}>{label}</InputLabel>
      <Select
        labelId={`${name}__label`}
        id={`${name}__select`}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {error?.message && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

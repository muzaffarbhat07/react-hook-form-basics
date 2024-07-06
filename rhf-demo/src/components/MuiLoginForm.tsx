import { DevTool } from "@hookform/devtools";
import { TextField, Button, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";


type FormValues = {
  email: string;
  password: string;
}

const MuiLoginForm = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);
  }

  return (
    <div>
      <h1>Mui Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField 
            label="Email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField 
            label="Password" 
            type="password" 
            {...register('password', { required: 'Password is required'})} 
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button 
            variant="contained" 
            type="submit" 
            color="primary"
          >
            Log in
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default MuiLoginForm;
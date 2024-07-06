import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
}

const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  //register allows us to register the input fields with the form to control/track their values
  // const { name, ref, onChange, onBlur } = register('username');

  const { errors } = formState; //errors is an object that contains all the errors of the form and its fields

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);
  }

  renderCount++;
  //noValidate is for browser validation
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          {/* <input 
            type="text" 
            id="username" 
            name={name} 
            ref={ref} 
            onChange={onChange} 
            onBlur={onBlur} 
          /> */}
          <input 
            type="text" 
            id="username" 
            {...register('username', {
              // required: 'Username is required',
              required: {
                value: true,
                message: 'Username is required'
              },
            })} 
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', {
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email format'
              }
            })} 
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        
        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <input 
            type="text" 
            id="channel" 
            {...register('channel', {
              required: 'Channel is required',
            })} 
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default YoutubeForm;
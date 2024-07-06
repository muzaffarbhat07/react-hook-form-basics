import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string
  }[];
}

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: ''
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }]
    }
  });
  const { register, control, handleSubmit, formState } = form;
  //register allows us to register the input fields with the form to control/track their values
  // const { name, ref, onChange, onBlur } = register('username');

  const { errors } = formState; //errors is an object that contains all the errors of the form and its fields

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phNumbers'
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);
  }

  renderCount++;
  //noValidate is for turning off browser validation
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
              },
              // validate: (fieldValue) => {
              //   return fieldValue !== 'admin@example.com' || 'email address not allowed';
              // }
              validate: {
                notAllowedEmail: (fieldValue) => fieldValue !== 'admin@example.com' || 'email address not allowed',
                notBlacklisted: (fieldValue) => !fieldValue.endsWith('baddomain.com') || 'this domain is not supported'
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
              required: {
                value: true,
                message: 'Channel is required'
              }
            })} 
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter:</label>
          <input 
            type="text" 
            id="twitter" 
            {...register('social.twitter', {
              required: {
                value: true,
                message: 'Twitter is required'
              }
            })} 
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook:</label>
          <input 
            type="text" 
            id="facebook" 
            {...register('social.facebook', {
              required: {
                value: true,
                message: 'Facebook is required'
              }
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number:</label>
          <input 
            type="text" 
            id="primary-phone" 
            {...register('phoneNumbers.0', {
              required: {
                value: true,
                message: 'Primary phone number is required'
              }
            })}
          />
          <p className="error">{errors.phoneNumbers && errors.phoneNumbers[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number:</label>
          <input 
            type="text" 
            id="secondary-phone" 
            {...register('phoneNumbers.1', {
              required: {
                value: true,
                message: 'Secondary phone number is required'
              }
            })}
          />
          <p className="error">{errors.phoneNumbers && errors.phoneNumbers[1]?.message}</p>
        </div>

        <div>
          <label htmlFor="phNumbers">List of Phone Numbers:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="form-control">
              <input 
                type="text" 
                {...register(`phNumbers.${index}.number`, {
                  required: {
                    value: true,
                    message: 'Phone number is required'
                  }
                })}
              />
              {index > 0 && <button type="button" onClick={() => remove(index)}>Remove</button>}
              <p className="error">{errors.phNumbers && errors.phNumbers[index]?.number?.message}</p>
            </div>
          ))}
          <button type="button" onClick={() => append({ number: '' })}>Add Phone Number</button>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default YoutubeForm;
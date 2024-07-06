import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

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
  age: number;
  dob: Date
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
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date()
    }
  });
  const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
  //register allows us to register the input fields with the form to control/track their values
  // const { name, ref, onChange, onBlur } = register('username');

  const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState; //errors is an object that contains all the errors of the form and its fields
  console.log({ touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount })
  //Note: dirty is tested against the default values. If after modifying, you go back to default value, dirty is false
  //isDirty can be used to enable/disable the submit button

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phNumbers'
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);
  }

  //onError is called when there are errors in the form
  //With this, we can handle the errors in a custom way
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('Form errors = ', errors);
  }

  //NOTE: watch triggers re-render of the component when the watched value changes
  // const watchUsername = watch('username'); //watch is used to watch the value of a field
  // const watchMultiple = watch(['username', 'email']); //watch multiple fields (username and email in this case
  // const watchAllFields = watch(); //watch all fields

  //perform side effects when the watched value changes
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch])

  //getValues does not trigger re-renders
  const handleGetValues = () => {
    console.log('Form values = ', getValues()); //get all values
    console.log('Email = ', getValues('email')); //get value of email field
    console.log('Multiple values = ', getValues(['username', 'email'])); //get values of multiple fields
  }

  const handleSetValue = () => {
    setValue('username', 'admin'); //set value of username field
    //by default, setValue does not affect the states of the field value like touched, dirty
    //to update the states, pass the second argument as below
    setValue('email', 'myemail@example.com', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  renderCount++;

  //noValidate is for turning off browser validation

  //NOTE: setting a field disabled by react-hook makes the form dirty
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      {/* <h2>Watched value: {watchUsername}</h2>
      <h2>Watched values: {JSON.stringify(watchMultiple)}</h2>
      <h2>Watched all fields: {JSON.stringify(watchAllFields)}</h2> */}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
              // disabled: true, //value becomes undefined and validations are also disabled
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
              // disabled: watch('channel') === '', //disable the field if channel is empty
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

        <div className="form-control">
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'Age is required'
              }
            })} 
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth:</label>
          <input 
            type="date" 
            id="dob" 
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'Date of birth is required'
              }
            })} 
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type="button" onClick={handleGetValues}>Get Values</button>
        <button type="button" onClick={handleSetValue}>Set Value</button>
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default YoutubeForm;
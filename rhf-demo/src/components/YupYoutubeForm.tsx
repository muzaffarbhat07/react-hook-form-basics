import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  channel: yup.string().required("Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
}

const YupYoutubeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);
  }
  return (
    <div>
      <h1>Yup Youtube Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" {...register("username")}/>
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
          </div>
        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <input type="text" id="channel" {...register("channel")}/>
          <p className="error">{errors.channel?.message}</p>
          </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YupYoutubeForm;
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const validationSchema = z.object({
  username: z.string().min(1, "Username is required"), // nonempty is deprecated
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  channel: z.string().min(1, "Channel is required"),
});

// type FormValues = {
//   username: string;
//   email: string;
//   channel: string;
// }

type FormValues = z.infer<typeof validationSchema>;

const ZodYoutubeForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('Form submitted. Form data = ', data);

    //setError("username", { message: "This is an error message" });
    //setError("root", { message: "This is an error message" });
  }
  return (
    <div>
      <h1>Zod Youtube Form</h1>
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

export default ZodYoutubeForm;
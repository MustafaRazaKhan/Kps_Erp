type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
};
const FormContainer = ({ children, onSubmit }: FormProps) => {
  return (
    <>
      <form
        className="p-2.5 rounded w-full lg:p-3 md:p-3 xxl:p-3"
        onSubmit={(e) => onSubmit(e)}
      >
        {children}
      </form>
    </>
  );
};

export default FormContainer;

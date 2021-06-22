import './Authorization.css';

function Authorization({title, name, children, onSubmit}) {

  return (
    <div className="auth">
      <h3 className="auth__title">{title}</h3>
      <form className="form" name={name} noValidate onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

export default Authorization;

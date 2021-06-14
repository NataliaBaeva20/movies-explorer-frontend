import './Authorization.css';


function Authorization(props) {
  return (
    <div className="auth">
      <h3 className="auth__title">{props.title}</h3>
      <form className="form" name={props.name} noValidate>
        {props.children}
      </form>
    </div>
  );
}

export default Authorization;

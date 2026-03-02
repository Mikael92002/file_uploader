import { Link } from "react-router";

const ErrorPage = () =>{
return (
    <>
    <div style={{height: "100%"}}>404 Page Not Found! Click <Link to="/home">here</Link> to go back to home</div>
    </>
)
}
export default ErrorPage;
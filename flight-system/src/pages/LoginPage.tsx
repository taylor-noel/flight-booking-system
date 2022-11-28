import './LoginPage.css';

function LoginPage() {

    return <div className="loginPage">
        <form className="loginForm">
            <label className="title">Login</label>
            <label>Email Address</label>
            <input type="email" placeholder="Enter email" />
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
            <button>Submit</button>
        </form>
    </div>
}
export default LoginPage;
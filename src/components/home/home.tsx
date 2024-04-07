import { router } from '../../main';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Homepage !</h1>
            <p>This is a simple homepage component.</p>
            <button onClick={() => {localStorage.removeItem('jwtToken'); router.navigate("/log");}}>Disconnect</button>
        </div>
    );
}

export default Home;
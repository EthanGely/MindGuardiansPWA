type HandleNavigate = (path: string) => void;

function Home(user: any, handleNavigate: HandleNavigate) {
  return (
    <div>
      <h1>Welcome to the Homepage, {user.USER_FIRSTNAME} !</h1>
      <p>This is a simple homepage component.</p>
      <button
        onClick={() => {
          localStorage.removeItem("jwtToken");
          handleNavigate("/log");
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

export default Home;

function Dashboard() {
  return (
    <>
      <div>
        <h1>Interface Patient</h1>
        <h2>
          Bonjour <span id="name">TEST</span>
        </h2>
        <button className="button button--primary u-align-center">Discuter avec ma famille</button>
        <br />
        <button className="button button--primary u-align-center">Agenda</button>
      </div>
      <div className="disconnect">
        <button
          className="button button--secondary u-align-center u-mb-5"
          onClick={() => {
            localStorage.removeItem("jwtToken");
            window.location.href = "/";
          }}
        >
          Déconnexion
        </button>
      </div>
    </>
  );
}

export default Dashboard;

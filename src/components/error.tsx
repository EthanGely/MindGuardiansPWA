export default function ErrorPage() {

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Désolé, mais cette page n'existe pas, où vous n'avez pas les droits pour y accéder.</p>
      <br />
      <a href="/" className="button">Retour à l'accueil</a>
    </div>
  );
}
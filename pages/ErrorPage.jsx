import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("ERROR", error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Error: {error.message}</p>
      <pre>
        {error.status} - {error.statusText}
      </pre>
      <Link style={{ color: "blue" }} to="/">
        Return to the Home Page
      </Link>
    </div>
  );
}

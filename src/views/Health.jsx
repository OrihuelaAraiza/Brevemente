export default function Health() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "dev";
  const message = process.env.NEXT_PUBLIC_APP_COMMIT_MESSAGE || "";
  return (
    <main className="page health-page">
      <h1>OK</h1>
      <p>Version: {version}</p>
      {message ? <p>{message}</p> : null}
    </main>
  );
}

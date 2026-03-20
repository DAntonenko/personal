export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main>
      <form method="POST" action="/api/auth/login">
        {params.error && (
          <p>Invalid login or password</p>
        )}

        <input name="email" />
        <input name="password" type="password" />
        <button type="submit">Login</button>
      </form>
      
      <a href="/">Back to Homepage</a>
    </main>
  );
}

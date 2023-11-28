
export default function Home() {
    return (
      <main className="h-screen bg-none">
        <h1>login/signup form</h1>
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="text" name="password" />
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input type="text" name="passwordConfirm" />
        </form>
      </main>
    )
  }
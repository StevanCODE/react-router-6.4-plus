import React from "react";
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";
import { requireAuth } from "../utils";

export const loader = ({ request }) => {
  requireAuth(request);
  return new URL(request.url).searchParams.get("message");
};

export const action = async ({ request }) => {
  //form data dobijamo pozivanjem ugradjene async funkcije formData() u request objektu
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/vans";

  let data = {};
  try {
    data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem("loggedin", true);
      return redirect(pathname);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
  return null;
};

// BRISEMO:
// 1) State za form inpute
// 2) State za error
// 3) State za status requesta
// 4) handleSubmit funkciju i onSubmit sa forme
// 5 handleChange funckiju i onChange sa inputa, kao i value atribut

// Umesto toga DODAJEMO:
// 1) eksportovanu async funkciju action u kojoj dobijamo vrednosti inputa kada pozovemo await request.formData()
// 2) koristimo redirect umesto navigate jer nam je funkcija action van nase komponente
// 3) iz action funkcije vracamo error state u catch blocku i koristimo ga unutar komponente sa useActionData() hook-om
// 4) useNavigation hook nam daje sve informacije vezane za nas form post request u kome mozemo da nadjemo i status (submitting, idle, loading) naseg requesta

export default function Login() {
  const message = useLoaderData();
  const err = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      {message && <h2>{message}</h2>}
      <h1>Sign in to your account</h1>
      {err && <h4>{err.message}</h4>}
      <Form method="post" replace className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting" ? true : false}> {navigation.state === "submitting" ? "Loggin in" : "Log In"}</button>
      </Form>
    </div>
  );
}

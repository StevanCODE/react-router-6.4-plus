import { redirect } from "react-router-dom";

export function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedin") || false;
  let path = "";
  if (request) {
    path = new URL(request.url).pathname;
    // if (path === "/login" && isLoggedIn) {
    // Iz nekog razloga ovde ovaj redirect radi samo sa throw, a ne sa returnom
    //   throw redirect("/");
    // }
  }
  if (!isLoggedIn) {
    //Konvencija ovde je throw redirect, ali to dovodi do toga da se browser zamrzne tako da koristi return
    return redirect(`/login?message=You Must Log In First${path ? "&redirectTo=" : ""}${path}`);
  }
}

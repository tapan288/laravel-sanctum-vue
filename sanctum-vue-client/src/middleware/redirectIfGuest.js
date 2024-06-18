import useAuth from "@/composable/useAuth";

export default function redirectIfGuest({ next }) {
  const { authenticated } = useAuth();

  if (!authenticated.value) {
    return next({
      name: "login",
    });
  }

  return next();
}

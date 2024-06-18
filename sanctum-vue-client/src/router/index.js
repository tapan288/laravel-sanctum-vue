import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import middlewarePipeline from "./middlewarePipeline";
import redirectIfGuest from "@/middleware/redirectIfGuest";
import exampleMiddleware from "@/middleware/exampleMiddleware";
import redirectIfAuthenticated from "@/middleware/redirectIfAuthenticated";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        middleware: [redirectIfGuest],
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        middleware: [redirectIfAuthenticated],
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        middleware: [redirectIfAuthenticated],
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  // Get the middleware
  const middleware = to.meta.middleware;

  const context = { to, from, next };

  // Call the first middleware
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;

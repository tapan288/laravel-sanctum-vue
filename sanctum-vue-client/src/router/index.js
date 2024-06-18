import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import exampleMiddleware from "@/middleware/exampleMiddleware";
import middlewarePipeline from "./middlewarePipeline";

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
        middleware: [exampleMiddleware, exampleMiddleware, exampleMiddleware],
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
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

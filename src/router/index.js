import { createRouter, createWebHistory } from "vue-router";
import IplView from "@/views/IplView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/ipl",
      name: "ipl",
      component: IplView
    }
  ]
})

export default router

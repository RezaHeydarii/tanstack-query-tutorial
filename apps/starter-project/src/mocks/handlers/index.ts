import { userHandlers } from "./user";
import { todoHandlers } from "./todo";

export const handlers = [...userHandlers, ...todoHandlers];

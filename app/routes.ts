import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("gamehub","routes/gamehub.tsx"),
    route("hangman","routes/hangman.tsx"),
    route("apod","routes/apod.tsx"),
    // route("chefclaude","routes/chefclaude.tsx"),
    route("tenzies","routes/tenzies.tsx"),
    route("memegen","routes/memegen.tsx"),
    route("workoutapp","routes/workoutapp.tsx"),
] satisfies RouteConfig;

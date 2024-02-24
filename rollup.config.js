// Import rollup plugins
// import html from "@web/rollup-plugin-html";
// import { copy } from "@web/rollup-plugin-copy";
// import resolve from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";
// import minifyHTML from "rollup-plugin-minify-html-literals";
// import summary from "rollup-plugin-summary";
// import json from "@rollup/plugin-json";
// import typescript from "@rollup/plugin-typescript";
// import serve from "rollup-plugin-serve";
// import postcss from "rollup-plugin-postcss";
import vue from 'rollup-plugin-vue'


export default {
  process: {},
  input: "",
  plugins: [vue(/* options */)],
  output: {
    dir: "",
  }
};
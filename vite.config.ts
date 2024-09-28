import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-todo-app-demo/", // リポジトリ名を指定
  server: {
    port: 3000, // デフォルトのポートを3000に設定
    strictPort: false,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

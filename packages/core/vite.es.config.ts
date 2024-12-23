import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const COMP_NAMES = [
    "Alert",
    "Button",
    "Collapse",
    "DropDown",
    "Form",
    "Input",
    "Icon",
    "Loading",
    "Message",
    "MessageBox",
    "Notification",
    "Overlay",
    "Popconfirm",
    "Select",
    "Switch",
    "Tooltip",
    "Upload"
] as const;

export default defineConfig({
    plugins: [vue(), dts({
        tsconfigPath: "../../tsconfig.build.json",
        outDir: "dist/es/types",
    })],
    build: {
        outDir: "dist/es",
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "HapElement",
            fileName: `index`,
            formats: ["es"]
        },
        rollupOptions: {
            external: ["vue",
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator"
            ],
            output: {
                assetFileNames(chunkInfo) {
                    if (chunkInfo.name === "style.css") return "index.css";
                    return chunkInfo.name as string;
                },
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";
                    if (id.includes("packages/hooks")) return "hooks";
                    if (id.includes("packages/utils")) return "utils";
                    
                    for(const name of COMP_NAMES) {
                        if (id.includes(`packages/components/${name}`)) {
                            return name;
                        }
                    }
                },
            },

        }
    }
})
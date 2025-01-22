import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";

const getLanguageExtension = (language) => {
    switch (language.toLowerCase()) {
        case "javascript":
        case "js":
        case "typescript":
        case "ts":
            return javascript();
        case "html":
            return html();
        case "css":
            return css();
        case "python":
        case "py":
            return python();
        case "java":
        case "c#":
        case "csharp":
            return java();
        case "c++":
        case "cpp":
            return cpp();
        case "go":
        case "golang":
            return go();
        case "rust":
            return rust();
        default:
            return javascript();
    }
};


export default getLanguageExtension;


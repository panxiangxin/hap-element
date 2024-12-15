import { makeInstaller } from "@hap-element/utils";
import components from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import '@hap-element/theme/index.css';

library.add(fas);

const installer = makeInstaller(components);

export * from '@hap-element/components';

export default installer;
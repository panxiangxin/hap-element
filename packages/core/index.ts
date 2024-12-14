import { makeInstaller } from "@hap-element/utils";
import components from "./components";
import '@hap-element/theme/index.css';

const installer = makeInstaller(components);

export * from '@hap-element/components';

export default installer;
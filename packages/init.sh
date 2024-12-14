mkdir components core docs hooks theme utils
for i in components core docs hooks theme utils; do
 cd $i
 pnpm init
 cd ..
done

pnpm add -D @vue/test-utils@^2.4.5 @vitest/coverage-v8@^1.4.0 jsdom@^24.0.0 --filter @hap-element/components
pnpm add @popperjs/core@^2.11.8 async-validator@^4.2.5 --filter @hap-element/components

pnpm add -D vitepress@1.0.0-rc.44 --filter @hap-element/docs
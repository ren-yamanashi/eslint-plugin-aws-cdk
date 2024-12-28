npx tsc -p tsconfig.build.json && \
find dist -mindepth 1 ! -name 'index.d.ts' ! -name 'index.d.ts.map' -exec rm -rf {} + && \
mkdir -p dist/types && \
mv dist/index.d.ts dist/types/index.d.ts && \
mv dist/index.d.ts.map dist/types/index.d.ts.map && \
pkgroll --tsconfig=tsconfig.build.json && \
mv dist/types/index.d.ts dist/index.d.ts && \
mv dist/types/index.d.ts.map dist/index.d.ts.map && \
rm -rf dist/types
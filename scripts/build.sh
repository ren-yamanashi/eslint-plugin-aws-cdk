#!/bin/bash

# NOTE: This library uses `pkgroll` to generate d.ts, but using `d.ts` created by tsc because `pkgroll` does not support `declarationMap`.

# Terminate script on error
set -e

DIST_DIR="dist"
TYPES_DIR="${DIST_DIR}/types"

# build types
npx tsc -p tsconfig.build.json || exit 1

# Delete unnecessary files (other than those related to index.d.ts)
find ${DIST_DIR} -mindepth 1 ! -name 'index.d.ts' ! -name 'index.d.ts.map' -exec rm -rf {} +

# move type definition files
mkdir -p ${TYPES_DIR}
mv ${DIST_DIR}/index.d.ts ${TYPES_DIR}/
mv ${DIST_DIR}/index.d.ts.map ${TYPES_DIR}/

# build
pkgroll --tsconfig=tsconfig.build.json || exit 1

# restore type definition files
mv ${TYPES_DIR}/index.d.ts ${DIST_DIR}/
mv ${TYPES_DIR}/index.d.ts.map ${DIST_DIR}/

# delete temporary directory
rm -rf ${TYPES_DIR}

echo "Build completed successfully!"

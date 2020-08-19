module.exports = {
  include:[
    "packages/d2-crud-plus/src/lib/components/form/*.vue",
    "packages/d2-crud-plus/src/lib/components/format/*.vue",
    "packages/d2-crud-plus/src/lib/components/search/*.vue",
    "packages/d2-crud-plus/src/lib/components/toolbar/*.vue",
    "packages/d2-crud-plus-extends/src/*/lib/*.vue",
    "packages/d2-crud-plus-extends/src/*/lib/*/*.vue"
    // "packages/d2-crud-x/src/*.vue",
    // "packages/d2-crud-x/src/components/*.vue"
  ],
  genType:'markdown',
  outDir:"docspress/guide",
}

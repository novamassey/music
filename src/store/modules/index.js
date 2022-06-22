// import camelCase from "lodash/camelCase";

// const requireModule = require.context(".", false, /\.js$/);
// const modules = {};

// requireModule.keys().forEach((fileName) => {
//   if (fileName === "./index.js") {
//     return;
//   }
//   const moduleConfig = requireModule(fileName);

//   const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));

//   modules[moduleName] = moduleConfig.default || moduleConfig;
// });

// export default modules;

// require.context is avail through webpack, takes three arguments, 1st
//  directory to search, 2nd should be if webpack need to search sub directories,
// 3rd is regex for file names that end with .vue, returns info about file
// does not import file iteself

// this returns file, keys fn to return array of files based on above, foEach to loopthrough
// import data returned from baseComponents function(also a function) webpack will parse data from file

//  use lodash to convert to camelCase and regrex to remove '.'

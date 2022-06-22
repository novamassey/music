import _ from "lodash";

export default {
  install(app) {
    // require.context is avail through webpack, takes three arguments, 1st
    //  directory to search, 2nd should be if webpack need to search sub directories,
    // 3rd is regex for file names that end with .vue, returns info about file
    // does not import file iteself
    const baseComponents = require.context(
      "../components/base/",
      false,
      /[A-Za-z0-9-_,\s]+\.vue$/i,
    );
    // this returns file, keys fn to return array of files based on above, foEach to loopthrough
    // import data returned from baseComponents function(also a function) webpack will parse data from file
    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);

      // use lodash to format component name in Pascalcase
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")),
        // console.log(filename, componentName)
      );
      // export default-webpack export under default, so second arg can  be the default or the config so if it has webpack config files
      // it will use that rather than actual  config object
      app.component(
        `Base${componentName}`,
        componentConfig.default || componentConfig,
      );
    });
  },
};

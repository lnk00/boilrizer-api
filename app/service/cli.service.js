import { angular } from './cli/angular.cli';

let funcMap = {
  angular: angular,
};

export default {
  create(config) {
    return funcMap[config.boilr](config);
  },
};

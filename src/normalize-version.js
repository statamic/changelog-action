exports.normalizeVersion = version => {
  version = version.replace(/^refs\/tags\//, '');

  if (! version.startsWith('v')) version = 'v'+version;

  return version;
}

let promiseFromChildProcess = (child) => {
  return new Promise(function (resolve, reject) {
    child.addListener('error', reject);
    child.addListener('exit', resolve);
    child.addListener('close', resolve);
  });
};

export { promiseFromChildProcess };

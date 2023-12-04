const tencentcloud = require("tencentcloud-sdk-nodejs");

const TiiaClient = tencentcloud.tiia.v20190529.Client;

const clientConfig = {
  credential: {
    secretId: "AKIDLVP3QXOzJQHrACxSgdIhqiKglY4JI0Rb",
    secretKey: "vax3tTmoZ4IEtHODm45pIUigNnxqSnti",
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "tiia.tencentcloudapi.com",
    },
  },
};

const client = new TiiaClient(clientConfig);

/**
 * @desc 调用腾讯云识物API，返回数据
 * @param {*} params 
 * @returns
 */
function detectProduct(params, callback) {
  client.DetectProductBeta(params).then(res => {
    callback(res);
  },
    err => {
      callback(err);
    });
}

module.exports = {
  detectProduct
}
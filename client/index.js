const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "../server/news.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

const call = client.getAllNews({});
call.on("data", function (response) {
  console.log(response);
});

call.on("end", function () {
  console.log("end");
});

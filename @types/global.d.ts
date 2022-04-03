declare global {
  var _mongoClientPromise: Promise<any>;
  var mongoose: {
    conn: any;
    promise: any;
  };
}
export {};


class Database {

  dynamo;

  constructor() {
    this.dynamo = new AWS.DynamoDB.DocumentClient();
  }

  get(identityId) {
    const params = {
      TableName: 'DEMO_USER',
      Key: {
        userId: identityId
      }
    };

    return this.dynamo.get(params).promise()
      .then((result) => {
        if (result.Item) {
          return result.Item;
        }
        throw new Error(`No customer with identityId: ${identityId}`);
      });
  }
}

export default Database;

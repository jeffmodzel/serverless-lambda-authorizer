module.exports.handler = function(event, context) {
    
    console.log(event);
    console.log(context);
    console.log('Client token: ' + event.authorizationToken);
    console.log('Method ARN: ' + event.methodArn);

    var principalId = 'user|a1b2c3d4'
    let arnParts = arnParse(event.methodArn);
    console.log(arnParts);

    if (event.authorizationToken === 'jeff') {
        console.log('token is valid')
        const policy = getBaseAllowPolicy();
        policy.principalId = principalId;
        policy.policyDocument.Statement[0].Resource[0] = event.methodArn;
        console.log(JSON.stringify(policy));
        context.succeed(policy);
    } else {
        console.log('token is invalid')
        context.fail("Unauthorized");
    }
};

function arnParse(arnString) {
    // https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
    // example - arn:aws:execute-api:us-east-2:722683319461:ulfzfmh3g6/dev/GET/cats 
    try {
        const parts = {
            "arn" : "arn",
            "partition" : "",  //almost always aws
            "service" : "",
            "region" : "",
            "account" : "",
            "resource" : ""
        }
        var tmp = arnString.split(':');
        parts.partition = tmp[1];
        parts.service = tmp[2];
        parts.region = tmp[3];
        parts.account = tmp[4];
        parts.resource = tmp[5];

        return parts;
    } catch(e) {
        console.log('Exception in arnParse()');
        console.log(e);
        return {};
    }
}

function arnParse2(arnString) {
    var components = [
      'arn',
      'aws',
      'service',
      'region',
      'account',
      'resource',
  ]
  
      return arnString.split(':').reduce(function(result, part, idx){
          result[ components[idx] ] = part
          return result
      }, {})
  }
  


function getBaseAllowPolicy() {
    // resource in here is bogus, needs to be overwritten with real resource arn
    return {
        "principalId": "", // the principal user identification associated with the token send by the client
        "policyDocument": { // example policy shown below, but this value is any valid policy
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "execute-api:Invoke"
              ],
              "Resource": [
                "arn:aws:execute-api:us-east-1:xxxxxxxxxxxx:xxxxxxxx:/test/*/mydemoresource/*"
              ]
            }
          ]
        }
      }
}
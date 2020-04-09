module.exports.handler = function(event, context, callback) {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)
  
    const data = [
        {"name" : "Sammie", "breed" : "Orange Tabby" },
        {"name" : "Kitty", "breed" : "Black domestic" },
        {"name" : "Zeus", "breed" : "Main Coone" }
    ];
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  
    callback(null, response);
};
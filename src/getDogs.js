module.exports.handler = function (event, context, callback) {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    const data = [
        { name: "Stella", breed: "Yorkie" },
        { name: "Spike", breed: "Golden Retriever" },
        { name: "Bella", breed: "Boxer" },
    ];

    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "My Header Value",
        },
        body: JSON.stringify(data),
    };

    callback(null, response);
};

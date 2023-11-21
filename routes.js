const responseUtils = require("./utils/responseUtils");
const {
  acceptsJson,
  isJson,
  parseBodyJson,
  getCredentials,
} = require("./utils/requestUtils");
const { renderPublic } = require("./utils/render");
const { getCurrentUser } = require("./auth/auth");
// const User = require('./models/user');
// const products = require('./products.json').map(product => ({...product }));
const { getAllProducts } = require("./controllers/products");
const {
  registerUser,
  getAllUsers,
  updateUser,
  viewUser,
  deleteUser,
} = require("./controllers/users");
const Product = require("./models/product");
const Order = require("./models/order");

/**
 * Known API routes and their allowed methods
 *
 * Used to check allowed methods and also to send correct header value
 * in response to an OPTIONS request by sendOptions() (Access-Control-Allow-Methods)
 */
const allowedMethods = {
  "/api/register": ["POST"],
  "/api/users": ["GET"],
  "/api/products": ["GET","POST"],
  "/api/orders": ["GET", "POST"],
};

/**
 * Send response to client options request.
 *
 * @param {string} filePath - The pathname of the request URL
 * @param {http.ServerResponse} response - The server response object
 */
const sendOptions = (filePath, response) => {
  if (filePath in allowedMethods) {
    response.writeHead(204, {
      "Access-Control-Allow-Methods": allowedMethods[filePath].join(","),
      "Access-Control-Allow-Headers": "Content-Type,Accept",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Expose-Headers": "Content-Type,Accept",
    });
    return response.end();
  }

  return responseUtils.notFound(response);
};

/**
 * Does the url have an ID component as its last part? (e.g. /api/users/dsf7844e)
 *
 * @param {string} url - The url to check for
 * @param {string} prefix - The prefix to be matched
 * @returns {boolean} true if url has ID component as last part and matches the prefix, false if not
 */
const matchIdRoute = (url, prefix) => {
  const idPattern = "[0-9a-z]{8,24}";
  const regex = new RegExp(`^(/api)?/${prefix}/${idPattern}$`);
  return regex.test(url);
};

/**
 * Does the URL match /api/products/{id}
 *
 * @param {string} url filePath
 * @returns {boolean} true if URL matches, false if not
 */
const matchProductId = (url) => {
  return matchIdRoute(url, "products");
};

/**
 * Does the URL match /api/users/{id}
 *
 * @param {string} url filePath
 * @returns {boolean} true if URL matches, false if not
 */
const matchUserId = (url) => {
  return matchIdRoute(url, "users");
};


/**
 * Does the URL match /api/orders/{id}
 *
 * @param {string} url filePath
 * @returns {boolean} true if URL matches, false if not
 */
const matchOrderId = (url) => {
  return matchIdRoute(url, "orders");
};



const handleRequest = async (request, response) => {
  const { url, method, headers } = request;
  const filePath = new URL(url, `http://${headers.host}`).pathname;

  // serve static files from public/ and return immediately
  if (method.toUpperCase() === "GET" && !filePath.startsWith("/api")) {
    const fileName =
      filePath === "/" || filePath === "" ? "index.html" : filePath;
    return renderPublic(fileName, response);
  }

  if(matchOrderId(filePath)) {
    if (!acceptsJson(request)) {
      return responseUtils.contentTypeNotAcceptable(
        response
      );
    }
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }

    const urlParts = request.url.split("/");
    const orderId = urlParts[urlParts.length - 1];

    if (request.method === "GET") {
      // if (user.role !== 'admin') {
      //   return responseUtils.forbidden(response);
      // }
      if(user.role === "admin") {
        const order = await Order.findById(orderId).populate("products");
        if (!order) {
          return responseUtils.notFound(response);
        }
        return responseUtils.sendJson(response, order);
      }
      else {
        const order = await Order.findById(orderId).populate("products");
        if (!order) {
          return responseUtils.notFound(response);
        }
        else if(order.customerId.toString() !== user._id.toString()) {
          return responseUtils.notFound(response);
        }
        else {
          return responseUtils.sendJson(response, order);
        }
      }
    }
  }

  if (matchProductId(filePath)) {
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }
    if (!request.headers.accept) {
      return responseUtils.contentTypeNotAcceptable(response);
    }
    if (!request.headers.accept.includes("application/json")) {
      return responseUtils.contentTypeNotAcceptable(response);
    }

    const urlParts = request.url.split("/");
    const productId = urlParts[urlParts.length - 1];

    if (request.method === "GET") {
      // if (user.role !== 'admin') {
      //   return responseUtils.forbidden(response);
      // }
      const product = await Product.findById(productId);
      if (!product) {
        return responseUtils.notFound(response);
      }
      return responseUtils.sendJson(response, product);
    }

    if (request.method === "PUT") {
      if (user.role !== "admin") {
        return responseUtils.forbidden(response);
      }

      const productDetails = await parseBodyJson(request);
      try {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: productId },
          productDetails,
          { new: true,runValidators: true }
        );
        if (updatedProduct) {
          return responseUtils.sendJson(response, updatedProduct);
        } else {
          return responseUtils.notFound(response);
        }
      } catch (error) {
        return responseUtils.badRequest(response, "Invalid product data");
      }
    }

    if (request.method === "DELETE") {
      // const deletedUser = await User.findByIdAndRemove(userId);
      // return responseUtils.sendJson(response, deletedUser);
      const product = await Product.findById(productId);

      // User not found
      if (!product) {
        return responseUtils.notFound(response);
      }
      // If current user's role is not admin
      if (user.role !== "admin") {
        return responseUtils.forbidden(response);
      }
    
      const deletedProduct = await Product.findByIdAndRemove(productId);
      return responseUtils.sendJson(response, deletedProduct);
    }
  }

  if (matchUserId(filePath)) {
    // TODO: 8.6 Implement view, update and delete a single user by ID (GET, PUT, DELETE)
    // You can use parseBodyJson(request) from utils/requestUtils.js to parse request body

    // If the HTTP method of a request is OPTIONS you can use sendOptions(filePath, response) function from this module
    // If there is no currently logged in user, you can use basicAuthChallenge(response) from /utils/responseUtils.js to ask for credentials
    // If the current user's role is not admin you can use forbidden(response) from /utils/responseUtils.js to send a reply

    // Useful methods here include:
    // - getUserById(userId) from /utils/users.js
    // - notFound(response) from  /utils/responseUtils.js
    // - sendJson(response,  payload)  from  /utils/responseUtils.js can be used to send the requested data in JSON format

    // HTTP method is OPTIONS
    if (request.method === "OPTIONS") {
      return sendOptions(filePath, response);
    }

    // No currently logged in user
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }
    if (!request.headers.accept) {
      return responseUtils.contentTypeNotAcceptable(response);
    }
    if (!request.headers.accept.includes("application/json")) {
      return responseUtils.contentTypeNotAcceptable(response);
    }

    // Last part of url is userId
    const urlParts = request.url.split("/");
    const userId = urlParts[urlParts.length - 1];

    // User based on id
    // const userById = await User.findById(userId);

    // User not found
    // if (!userById) {
    //   return responseUtils.notFound(response);
    // }

    // If current user's role is not admin
    // if (user.role !== 'admin') {
    //   return responseUtils.forbidden(response);
    // }

    if (request.method === "GET") {
      return await viewUser(response, userId, user);
      // ??
      // return responseUtils.sendJson(response, user);
    }

    if (request.method === "PUT") {
      return await updateUser(
        response,
        userId,
        user,
        await parseBodyJson(request)
      );
    }

    if (request.method === "DELETE") {
      // const deletedUser = await User.findByIdAndRemove(userId);
      // return responseUtils.sendJson(response, deletedUser);
      return await deleteUser(response, userId, user);
    }
  }

  // Default to 404 Not Found if unknown url
  if (!(filePath in allowedMethods)) return responseUtils.notFound(response);

  // See: http://restcookbook.com/HTTP%20Methods/options/
  if (method.toUpperCase() === "OPTIONS")
    return sendOptions(filePath, response);

  // Check for allowable methods
  if (!allowedMethods[filePath].includes(method.toUpperCase())) {
    return responseUtils.methodNotAllowed(response);
  }

  // Require a correct accept header (require 'application/json' or '*/*')
  if (!acceptsJson(request)) {
    return responseUtils.contentTypeNotAcceptable(response);
  }

  // GET all users
  if (filePath === "/api/users" && method.toUpperCase() === "GET") {
    // TODO: 8.5 Add authentication (only allowed to users with role "admin")
    if (!request.headers.authorization) {
      return responseUtils.basicAuthChallenge(response);
    }
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }
    if (user.role === "customer") {
      return responseUtils.forbidden(response);
    }
    await getAllUsers(response);
    // const users = await User.find({});
    // return responseUtils.sendJson(response, users);
  }

  // register new user
  if (filePath === "/api/register" && method.toUpperCase() === "POST") {
    // Fail if not a JSON request, don't allow non-JSON Content-Type
    if (!isJson(request)) {
      return responseUtils.badRequest(
        response,
        "Invalid Content-Type. Expected application/json"
      );
    }

    // TODO: 8.4 Implement registration
    // You can use parseBodyJson(request) method from utils/requestUtils.js to parse request body.
    // Useful methods here include:
    // - validateUser(user) from /utils/users.js
    // - emailInUse(user.email) from /utils/users.js
    // - badRequest(response, message) from /utils/responseUtils.js
    const { email, password, name } = await parseBodyJson(request);
    return await registerUser(response, { email, password, name });
    // const user = {
    //   name,
    //   email,
    //   password
    // };
    // try {
    //   const newUser = new User(user);

    //   await newUser.validate(); // Explicitly validate the data against the schema

    //   const savedUser = await newUser.save();
    //   return responseUtils.createdResource(response, savedUser);
    // } catch (error) {
    //   // Handle validation or save errors
    //   return responseUtils.badRequest(response, 'Invalid user data');
    // }
  }

  if (filePath === "/api/products" && method.toUpperCase() === "GET") {
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }

    // return responseUtils.sendJson(response, products);
    return getAllProducts(response);
  }

  if (filePath === "/api/products" && method.toUpperCase() === "POST") {
    if (!acceptsJson(request)) {
      return responseUtils.contentTypeNotAcceptable(
        response
      );
    }
    const user = await getCurrentUser(request);
    if (!user) {
      return responseUtils.basicAuthChallenge(response);
    }

    if (user.role !== "admin") {
      return responseUtils.forbidden(response);
    }

    if(!isJson(request)) {
      return responseUtils.badRequest(response, "Invalid Content-Type. Expected application/json");
    }

    const productDetails = await parseBodyJson(request);

    try {
      // Create a new document with the provided data
      const newProduct = new Product(productDetails);
  
      // Validate the new document against the model schema
      await newProduct.validate();
  
      // Save the new product to the database
      const savedProduct = await newProduct.save();
      responseUtils.createdResource(response, savedProduct);
    } catch (error) {
      responseUtils.badRequest(response, "Invalid product data");
    }
}

if (filePath === "/api/orders" && method.toUpperCase() === "GET") {
  if (!acceptsJson(request)) {
    return responseUtils.contentTypeNotAcceptable(
      response
    );
  }
  const user = await getCurrentUser(request);
  if (!user) {
    return responseUtils.basicAuthChallenge(response);
  }

  try {    
    if(user.role === "customer") {
      const orders = await Order.find({ customerId: user._id }).populate("products");
      responseUtils.sendJson(response, orders);
    } else {
      const orders = await Order.find({}).populate("products");
      responseUtils.sendJson(response, orders);
    }
  } catch (error) {
    responseUtils.badRequest(response);
  }
}

if (filePath === "/api/orders" && method.toUpperCase() === "POST") {
  if (!acceptsJson(request)) {
    return responseUtils.contentTypeNotAcceptable(
      response
    );
  }
  const user = await getCurrentUser(request);
  if (!user) {
    return responseUtils.basicAuthChallenge(response);
  }

  if(user.role ==="admin") {
    return responseUtils.forbidden(response);
  }

  if(!isJson(request)) {
    return responseUtils.badRequest(response, "Invalid Content-Type. Expected application/json");
  }

  const orderDetails = await parseBodyJson(request);

  if(!orderDetails.items || !Array.isArray(orderDetails.items) || orderDetails.items.length === 0) {
    return responseUtils.badRequest(response, "Invalid order data");
  }

  orderDetails.items.every(item => {
    if (!item.product || !item.quantity || typeof item.quantity !== 'number') {
      return responseUtils.badRequest(response, "Invalid order data");
    }

    const { product } = item;

    if (!product._id || !product.name || !product.price || typeof product.price !== 'number') {
      return responseUtils.badRequest(response, "Invalid order data");
    }
  });
  /*for (const item of orderDetails.items) {
    if (!item.product || !item.quantity || typeof item.quantity !== 'number') {
      return responseUtils.badRequest(response, "Invalid order data");
    }

    const { product } = item;

    if (!product._id || !product.name || !product.price || typeof product.price !== 'number') {
      return responseUtils.badRequest(response, "Invalid order data");
    }
  }*/

  try {
    const order = new Order({ customerId:user._id, items:orderDetails.items });
    await order.save();

    responseUtils.createdResource(response, order);
  } catch (error) {
    responseUtils.badRequest(response, "Invalid order data");
  }
}
};

module.exports = { handleRequest };

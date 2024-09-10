                                            Customers cart
1)To run project
npm run cart

2)add data in database
npm run data-import

3)remove all data from database
npm run data-destroy

4)To test api we start only server bcrypt
npm run server

5)To test our frontend 
npm run client


C-Cart is a robust e-commerce platform built with a MERN (MongoDB, Express, React, Node.js)
stack, featuring a secure PayPal payment gateway integration. The application provides a
seamless experience for both users and administrators by offering comprehensive product and
order management functionalities.
Architecture and Technology Stack:
● Frontend: React.js with functional components and React Hooks for state management
and API interactions. Client-side routing is handled by react-router-dom, and
asynchronous requests are managed using axios.
● Backend: Node.js with Express.js, handling RESTful API development. MongoDB
serves as the NoSQL database, interfaced via Mongoose for schema-based data
modeling.
● Authentication: JSON Web Tokens (JWT) are used for session management, ensuring
secure and stateless authentication. Passwords are hashed using bcryptjs, and JWTs
are set as HTTP-only cookies.
● Payment Integration: PayPal REST API is used for handling transactions. Users can
securely complete purchases, and payment status is tracked and updated in the
database.
Key Features:
1. User-Facing Functionalities:
○ Product Catalog: Users can browse products, which are fetched dynamically
using query parameters for filtering (e.g., search by keyword).
○ Shopping Cart: Cart items are managed on both the client and server sides,
allowing users to add, modify, and remove products.
○ Order Management: Orders include multiple components such as orderItems,
shippingAddress, and paymentMethod. The order total is calculated
dynamically, including shipping fees and GST.
2. Admin Capabilities:
○ Product Management: CRUD operations for product listings are implemented.
Admins can add new products, edit existing details, and remove products from
the catalog. These actions trigger MongoDB operations via Mongoose models.
○ Order Status Management: Admins can update order statuses to "paid" and
"delivered," with timestamps for these events logged in MongoDB. The system
ensures real-time updates and response.
○ User Management: Admins can retrieve user data, including profile information,
and manage user roles (e.g., promoting a user to admin status).
3. API Endpoints:
○ Product Endpoints:
■ GET /products: Retrieves all products, supports filtering via query
parameters.
■ GET /products/:id: Fetches product details by ID.
■ DELETE /products/:id: Deletes a product (Admin-only).
○ Order Endpoints:
■ POST /orders: Creates a new order with order details and payment
method.
■ PUT /orders/:id/pay: Updates an order's payment status after
successful transaction processing.
■ PUT /orders/:id/deliver: Marks an order as delivered
(Admin-only).
○ User Endpoints:
■ POST /users/login: Handles user login and issues a JWT token.
■ POST /users/register: Registers a new user and stores hashed
credentials in MongoDB.
■ GET /users/profile: Retrieves the logged-in user’s profile.
■ PUT /users/profile: Allows users to update their profile details.
4. Database:
○ MongoDB: All order, product, and user data is stored in MongoDB collections.
Mongoose is used for schema definitions and performing CRUD operations.
○ Order Schema: Consists of embedded documents such as orderItems (each
containing product references) and a nested shippingAddress object.
Payment status, delivery status, and timestamps (paidAt, deliveredAt) are
tracked as part of the order workflow.
5. Error Handling and Middleware:
○ Async Handler: Custom middleware using express-async-handler ensures
clean error handling for asynchronous operations.
○ JWT Authentication Middleware: Protects routes by verifying the JWT, ensuring
only authenticated users can access private routes (e.g., order history, user
profile).
6. Testing:
○ API Testing: All endpoints are rigorously tested using Postman to ensure
consistent functionality and edge-case coverage.
○ Database Operations: MongoDB operations such as lookups, filters, and
population (e.g., populate() to fetch user details in order responses) are
optimized for performance.
Challenges and Solutions:
● Scalable Order Management: Orders are stored with nested relationships, and product
information within orders is de-referenced at runtime using Mongoose’s populate()
method to ensure up-to-date product data.
● Efficient Authentication: JWT-based authentication ensures session persistence
without overloading the server, and the tokens are stored securely using HTTP-only
cookies to prevent XSS attacks.
● Seamless Payment Handling: Integration with PayPal’s API ensures that transactions
are completed securely, with the system handling responses and updating the order’s
payment status automatically.
Schema:
USER SCHEMA: (name, email, password, aadhar, contact number, address, city, PINcode,
country, isAdmin, createdAt and updatedAt times)
PRODUCT SCHEMA: (creatingUser, name, image, description, brand, category, price,
countInStock, rating, numberOfReviews, createdAt and updatedAt timestamps)
ORDER SCHEMA : (user, Array of Ordered items, shipping address, payment method,
paymentResult, totalAmount, shippingAmount, isPaid, timestamps etc)
For password encryption in your code, you're using bcrypt, which is a widely used password
hashing library. However, it's important to note that bcrypt is used for hashing passwords, not
encryption. Here's a breakdown of the differences and how bcrypt works:
Hashing vs. Encryption:
● Hashing: A one-way function that converts input (like a password) into a fixed-length
string of characters. Once a password is hashed, it cannot be reversed back to the
original password. Bcrypt is a hashing algorithm specifically designed to hash passwords
securely.
● Encryption: A two-way process where data is transformed using an encryption key and
can be decrypted back to its original form using a decryption key.
How bcrypt Works:
1. Salting: Bcrypt adds a unique, randomly generated salt to each password before
hashing. This ensures that even if two users have the same password, their hashes will
be different.
2. Hashing: After salting, bcrypt applies the Blowfish cipher internally and hashes the salted
password multiple times (based on the number of salt rounds). The higher the number of
rounds, the more secure but slower the hashing process becomes.
3. Hash Verification: When a user attempts to log in, bcrypt takes the entered password,
salts it the same way, and checks if the resulting hash matches the stored hashed
password.
Why bcrypt is Preferred for Password Hashing:
● Slow Hashing: Bcrypt is intentionally slow, making it harder for attackers to perform
brute-force attacks by trying many password combinations in a short time.
● Adaptive: The number of hashing rounds can be adjusted to keep up with increasing
computational power over time, ensuring future scalability.
● Salted Hashing: The built-in salting mechanism prevents attackers from using
precomputed hash tables (like rainbow tables) to crack passwords.
WHAT ARE MIDDLEWARES?
Middlewares are functions in web application frameworks (like Express.js in Node.js) that
execute during the request-response cycle. They serve various purposes, including:
1. Request Processing: Middlewares can modify the request object, add properties, or
perform actions before reaching the final route handler. For example, they can parse
request bodies, handle cookies, or authenticate users.
2. Error Handling: They can catch and handle errors that occur during request processing,
providing centralized error management.
3. Response Processing: After the final route handler processes the request,
middlewares can modify the response object or perform actions before sending the
response back to the client.
4. Chaining: Multiple middleware functions can be chained together, allowing for modular
and reusable code. Each middleware can pass control to the next one using next(),
enabling a smooth flow of requests.
5. Authorization: Middlewares can enforce access controls by checking user permissions
and roles before allowing access to certain routes.
Overall, middlewares help in organizing and structuring code, enhancing maintainability, and
managing cross-cutting concerns in web applications.
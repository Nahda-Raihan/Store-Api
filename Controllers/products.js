// const Product_Model=require('../Models/products')

// const getAllProductsStatic = async (req, res, next) => {
//   const product=await Product_Model.find({featured:true})
//   res.status(200).json({product,nbHits:product.length });
// };

// const getAllProducts = async (req, res) => {
// const{featured}=req.query;
// const queryObject={};
// if(featured){
//   queryObject.featured=featured==="true" ? true: false;
// }
// console.log(queryObject)
// const product=await Product_Model.find(queryObject)
//   res.static(200).json({ product,nbHits:product.length});
// };

// const application = (req,res)=>{
//   res.send("hai")
// }
// module.exports = {
//   getAllProducts,
//   getAllProductsStatic,
//   application
// }




// const Product = require('../Models/product')

// const getAllProductsStatic = async (req, res, next) => {
//     // const product = await Product.find({featured: true});
//     // res.status(200).json({product, nbHits: product.length})
    
//     const products = await Product.find({}).select("name price").limit(7).skip(5);
//     res.status(200).json({ products, nbHits: products.length})
//   };
  
//   const getAllProducts = async (req, res) => {
//     const {featured, name, company, sort, select, limit,skip} = req.query;
//     const queryObject = {};

//     if(featured) {
//         queryObject.featured = featured === "true" ? true : false;
//     }
//     if(name) {
//       queryObject.name = { $regex: name, $options: "i"}  ;
//     }
//     if(company) {
//       queryObject.company = { $regex: company, $options: "i"} ;
//     }
//     console.log(queryObject)

//     let product = Product.find(queryObject)

//     if(sort){
//       const sortList = sort.split(",").join(" ")

//       product = product.sort(sortList)
//     }

//     if(select){
//       const selectedlist = select.split(",").join(" ")

//       product = product.select(selectedlist)
//     }

//     if(limit){
//       product = product.limit(limit)
//     }

//     if(skip){
//       product = product.skip(skip)
//     }
//     const products = await product
//     res.status(200).json({products, nbHits: products.length})
//   };
  
//   module.exports = {
//     getAllProducts,
//     getAllProductsStatic
//   }


















const Product = require('../Models/products')

const getAllProductsStatic = async (req, res, next) => {
    // const product = await Product.find({featured: true});
    // res.status(200).json({product, nbHits: product.length})
    
    const products = await Product.find({price : {$gt : 40}}).sort("price")
    res.status(200).json({ products, nbHits: products.length})
  };
  
  const getAllProducts = async (req, res) => {
    const {featured, name, company, sort, select, numericFilters} = req.query;
    const queryObject = {};
   

    if(featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if(name) {
      queryObject.name = { $regex: name, $options: "i"}  ;
    }
    if(company) {
      queryObject.company = { $regex: company, $options: "i"} ;
    }
    console.log(queryObject)

    if(numericFilters){
      const operatorMap = {
        ">" : "$gt",
        "<" : "$lt",
        "=" : "$eq",
        ">=" : "$gte",
        "<=" : "$lte"
      };
      const regEx = /\b(<|>|=|<=|>=)\b/g;
      let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
      console.log(filters)
      
      const options = ["price", "rating"];

      filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");

        if(options.includes(field)){
          queryObject[field] = {[operator] : Number(value) }  //{price : {$gt : 40}}
        }
      });

    }

    let product = Product.find(queryObject)

    if(sort){
      const sortList = sort.split(",").join(" ")

      product = product.sort(sortList)
    }

    if(select){
      const selectedlist = select.split(",").join(" ")

      product = product.select(selectedlist)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * 10
    product = product.limit(limit).skip(skip)

    const products = await product
    res.status(200).json({products, nbHits: products.length})
  };
  
  module.exports = {
    getAllProducts,
    getAllProductsStatic
  }









 
// ### `getAllProductsStatic` Function:

// ```javascript
// const getAllProductsStatic = async (req, res, next) => {
//     // const product = await Product.find({featured: true});
//     // res.status(200).json({product, nbHits: product.length})
    
//     const products = await Product.find({price : {$gt : 40}}).sort("price")
//     res.status(200).json({ products, nbHits: products.length})
// };
// ```

// 1. **Using `Product.find({price: {$gt: 40}})`**:
//    - This line queries the database for products where the `price` is greater than 40 using the `$gt` (greater than) operator.
//    - The result is stored in the `products` variable.

// 2. **Sorting the Products**:
//    - `.sort("price")`: This sorts the products based on the `price` field in ascending order.
   
// 3. **Sending JSON Response**:
//    - `res.status(200).json({ products, nbHits: products.length})`: This sends a JSON response to the client with the retrieved products and the count (`nbHits`) of the products.

// ### `getAllProducts` Function:

// ```javascript
// const getAllProducts = async (req, res) => {
//     const {featured, name, company, sort, select, numericFilters} = req.query;
//     const queryObject = {};

//     // Handling Filters
//     if(featured) {
//         queryObject.featured = featured === "true" ? true : false;
//     }
//     if(name) {
//       queryObject.name = { $regex: name, $options: "i"}  ;
//     }
//     if(company) {
//       queryObject.company = { $regex: company, $options: "i"} ;
//     }

//     // Handling Numeric Filters
//     if(numericFilters){
//       const operatorMap = {
//         ">" : "$gt",
//         "<" : "$lt",
//         "=" : "$eq",
//         ">=" : "$gte",
//         "<=" : "$lte"
//       };
//       const regEx = /\b(<|>|=|<=|>=)\b/g;
//       let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
      
//       const options = ["price", "rating"];

//       filters = filters.split(",").forEach((item) => {
//         const [field, operator, value] = item.split("-");

//         if(options.includes(field)){
//           queryObject[field] = {[operator] : Number(value) }  //{price : {$gt : 40}}
//         }
//       });
//     }

//     // Querying the Database
//     let product = Product.find(queryObject)

//     // Sorting
//     if(sort){
//       const sortList = sort.split(",").join(" ")

//       product = product.sort(sortList)
//     }

//     // Selecting Fields
//     if(select){
//       const selectedlist = select.split(",").join(" ")

//       product = product.select(selectedlist)
//     }

//     // Pagination
//     const page = Number(req.query.page) || 1
//     const limit = Number(req.query.limit) || 10
//     const skip = (page - 1) * 10
//     product = product.limit(limit).skip(skip)

//     // Executing the Query and Sending Response
//     const products = await product
//     res.status(200).json({products, nbHits: products.length})
// };
// ```

// 1. **Handling Filters (`queryObject`)**:
//    - The function constructs a `queryObject` to filter products based on various parameters like `featured`, `name`, and `company`.

// 2. **Handling Numeric Filters (`numericFilters`)**:
//    - Numeric filters are processed and added to the `queryObject`. The function uses a mapping of operators and regular expressions to parse the numeric filters.

// 3. **Querying the Database (`Product.find(queryObject)`)**
//    - The `Product.find()` function is used to query the database based on the constructed `queryObject`.

// 4. **Sorting, Selecting Fields, and Pagination**:
//    - If sorting, selecting fields, or pagination parameters are provided, they are applied to the query.

// 5. **Executing the Query and Sending Response**:
//    - The final set of products is obtained by executing the query, and a JSON response is sent to the client with the products and the count (`nbHits`).
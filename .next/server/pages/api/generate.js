"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/generate";
exports.ids = ["pages/api/generate"];
exports.modules = {

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ "(api)/./pages/api/generate.js":
/*!*******************************!*\
  !*** ./pages/api/generate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"openai\");\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(openai__WEBPACK_IMPORTED_MODULE_0__);\n\nconst configuration = new openai__WEBPACK_IMPORTED_MODULE_0__.Configuration({\n    apiKey: process.env.OPENAI_API_KEY\n});\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIApi(configuration);\n/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(req, res) {\n    const { priceMin , priceMax , gender , age , hobbies  } = req.body;\n    const prompt = generatePrompt(priceMin, priceMax, gender, age, hobbies);\n    console.log(prompt);\n    const completion = await openai.createCompletion({\n        model: \"text-davinci-003\",\n        prompt: prompt,\n        temperature: 0.6,\n        max_tokens: 2048\n    });\n    res.status(200).json({\n        result: completion.data.choices[0].text\n    });\n};\nfunction generatePrompt(priceMin, priceMax, gender, age, hobbies) {\n    return `suggest 3 three christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} year old ${gender} who is in ${hobbies}`;\n} //curl -X POST localhost:3000/api/generate -H \"Content-Type: application/json\" -d '{\"priceMin\": 50, \"priceMax\": 500, \"gender\":\"female\", \"age\":25, \"hobbies\": \"coding, travelling, cooking, reading\"}'\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2VuZXJhdGUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWtEO0FBRWxELE1BQU1FLGFBQWEsR0FBRyxJQUFJRixpREFBYSxDQUFDO0lBQ3RDRyxNQUFNLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxjQUFjO0NBQ25DLENBQUM7QUFDRixNQUFNQyxNQUFNLEdBQUcsSUFBSU4sNkNBQVMsQ0FBQ0MsYUFBYSxDQUFDO0FBRTNDLDZCQUFlLDBDQUFnQk0sR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDdkMsTUFBTSxFQUFDQyxRQUFRLEdBQUVDLFFBQVEsR0FBRUMsTUFBTSxHQUFFQyxHQUFHLEdBQUVDLE9BQU8sR0FBRSxHQUFHTixHQUFHLENBQUNPLElBQUk7SUFDNUQsTUFBTUMsTUFBTSxHQUFHQyxjQUFjLENBQUNQLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxNQUFNLEVBQUVDLEdBQUcsRUFBRUMsT0FBTyxDQUFDO0lBQ3ZFSSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsTUFBTSxDQUFDO0lBRW5CLE1BQU1JLFVBQVUsR0FBRyxNQUFNYixNQUFNLENBQUNjLGdCQUFnQixDQUFDO1FBQy9DQyxLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCTixNQUFNLEVBQUVBLE1BQU07UUFDZE8sV0FBVyxFQUFFLEdBQUc7UUFDaEJDLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLENBQUM7SUFDRmYsR0FBRyxDQUFDZ0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7UUFBRUMsTUFBTSxFQUFFUCxVQUFVLENBQUNRLElBQUksQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxJQUFJO0tBQUUsQ0FBQyxDQUFDO0NBQ25FO0FBRUQsU0FBU2IsY0FBYyxDQUFDUCxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLE9BQU8sRUFBRTtJQUNoRSxPQUFPLENBQUMsNkNBQTZDLEVBQUVKLFFBQVEsQ0FBQyxNQUFNLEVBQUVDLFFBQVEsQ0FBQyxRQUFRLEVBQUVFLEdBQUcsQ0FBQyxVQUFVLEVBQUVELE1BQU0sQ0FBQyxXQUFXLEVBQUVFLE9BQU8sQ0FBQyxDQUFDO0NBQ3pJLENBRUQscU1BQXFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmFpLXF1aWNrc3RhcnQtbm9kZS8uL3BhZ2VzL2FwaS9nZW5lcmF0ZS5qcz82MjdjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE9wZW5BSUFwaSB9IGZyb20gXCJvcGVuYWlcIjtcblxuY29uc3QgY29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKHtcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5PUEVOQUlfQVBJX0tFWSxcbn0pO1xuY29uc3Qgb3BlbmFpID0gbmV3IE9wZW5BSUFwaShjb25maWd1cmF0aW9uKVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgY29uc3Qge3ByaWNlTWluLCBwcmljZU1heCwgZ2VuZGVyLCBhZ2UsIGhvYmJpZXMgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBwcm9tcHQgPSBnZW5lcmF0ZVByb21wdChwcmljZU1pbiwgcHJpY2VNYXgsIGdlbmRlciwgYWdlLCBob2JiaWVzKTtcbiAgY29uc29sZS5sb2cocHJvbXB0KVxuICBcbiAgY29uc3QgY29tcGxldGlvbiA9IGF3YWl0IG9wZW5haS5jcmVhdGVDb21wbGV0aW9uKHtcbiAgICBtb2RlbDogXCJ0ZXh0LWRhdmluY2ktMDAzXCIsXG4gICAgcHJvbXB0OiBwcm9tcHQsXG4gICAgdGVtcGVyYXR1cmU6IDAuNixcbiAgICBtYXhfdG9rZW5zOiAyMDQ4LFxuICB9KTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IGNvbXBsZXRpb24uZGF0YS5jaG9pY2VzWzBdLnRleHQgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUHJvbXB0KHByaWNlTWluLCBwcmljZU1heCwgZ2VuZGVyLCBhZ2UsIGhvYmJpZXMpIHtcbiAgcmV0dXJuIGBzdWdnZXN0IDMgdGhyZWUgY2hyaXN0bWFzIGdpZnQgaWRlYXMgYmV0d2VlbiAke3ByaWNlTWlufSQgYW5kICR7cHJpY2VNYXh9JCBmb3IgYSAke2FnZX0geWVhciBvbGQgJHtnZW5kZXJ9IHdobyBpcyBpbiAke2hvYmJpZXN9YFxufVxuXG4vL2N1cmwgLVggUE9TVCBsb2NhbGhvc3Q6MzAwMC9hcGkvZ2VuZXJhdGUgLUggXCJDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cIiAtZCAne1wicHJpY2VNaW5cIjogNTAsIFwicHJpY2VNYXhcIjogNTAwLCBcImdlbmRlclwiOlwiZmVtYWxlXCIsIFwiYWdlXCI6MjUsIFwiaG9iYmllc1wiOiBcImNvZGluZywgdHJhdmVsbGluZywgY29va2luZywgcmVhZGluZ1wifSciXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvbiIsIk9wZW5BSUFwaSIsImNvbmZpZ3VyYXRpb24iLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiT1BFTkFJX0FQSV9LRVkiLCJvcGVuYWkiLCJyZXEiLCJyZXMiLCJwcmljZU1pbiIsInByaWNlTWF4IiwiZ2VuZGVyIiwiYWdlIiwiaG9iYmllcyIsImJvZHkiLCJwcm9tcHQiLCJnZW5lcmF0ZVByb21wdCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0aW9uIiwiY3JlYXRlQ29tcGxldGlvbiIsIm1vZGVsIiwidGVtcGVyYXR1cmUiLCJtYXhfdG9rZW5zIiwic3RhdHVzIiwianNvbiIsInJlc3VsdCIsImRhdGEiLCJjaG9pY2VzIiwidGV4dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/generate.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/generate.js"));
module.exports = __webpack_exports__;

})();
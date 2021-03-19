const router = require("express").Router();
const controllers = require("../controllers");
const auth = require("../middleware/auth");

router.get("/:userId/all", controllers.weather.index);
router.post("/", controllers.weather.create);
router.get("/:id", controllers.weather.show);
// router.get('/getposts/:id', controllers.weather.getPosts);
router.put("/:id", controllers.weather.update);
router.delete("/:id", controllers.weather.destroy);

module.exports = router;

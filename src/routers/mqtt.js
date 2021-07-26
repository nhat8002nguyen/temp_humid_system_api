const router = require("express").Router();
const axios = require("axios");

router.get("/temp-humid", async (req, res) => {
	const { data } = await axios.default.get("https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-temp-humid/data?limit=1", 
		{ headers: {"X-AIO-Key": process.env.MQTT_KEY}}
	);
	res.status(200).send(data);
});

router.get("/speaker", async (req, res) => {
	const { data } = await axios.default.get("https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-speaker/data?limit=1", 
		{ headers: {"X-AIO-Key": process.env.MQTT_KEY}}
	);
	res.status(200).send(data);
});

router.get("/range-temp-humid", async (req, res) => {
	const start_time = req.query["start_time"];
	const end_time = req.query["end_time"];

	const { data } = await axios.default.get("https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-temp-humid/data", 
		{ 
			headers: {"X-AIO-Key": process.env.MQTT_KEY},
			params: {
				start_time,
				end_time
			}	
		},
	);
	res.status(200).send(data);
});

router.post("/speaker", async (req, res) => {
	const value = req.body.value;

	const { data } = await axios.default.post("https://io.adafruit.com/api/v2/CSE_BBC/feeds/bk-iot-speaker/data", 
		{
			value: value
		},
		{ headers: {"X-AIO-Key": process.env.MQTT_KEY}}
	);
	res.status(200).send(data);
});


module.exports = router;
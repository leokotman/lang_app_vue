module.exports = {
	devServer: {
		host: "localhost",
	},
	publicPath: process.env.NODE_ENV === "production" ? "/weborigo_lang_vue/" : "/",
};

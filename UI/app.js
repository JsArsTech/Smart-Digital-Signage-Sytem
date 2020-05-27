let imageMap = new Map();

imageMap.set('Drizzle', 'img/drizzle.png');
imageMap.set('Rain', 'img/rain.png');
imageMap.set('Sun', 'img/sun.png');
imageMap.set('Clouds', 'img/clouds.png');

var app = new Vue({
	el: '#app',
	data() {
		return {
			weather: null,
			temperature: 0,
			imgUrl: 'img/sun.png',
			error: ""
		}
	},
	created() {
		let getData = async () => {
			try {
				let response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Caracas,ve&appid=eeb8fca7bd8375e62478bb71c596e63c');
				this.weather = response.data.weather[0].main;				
				this.imgUrl = imageMap.get(this.weather);
				this.temperature = (response.data.main.temp * 9 / 5 - 459.67).toFixed(2);
			}			
			catch (err) {
				this.error = err;
			}
			setTimeout(getData, 1000 * 60 * 1);
		};
		getData();
	}
});

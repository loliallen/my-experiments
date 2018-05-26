import React from 'react'




const CurrentCity = ({name, temp , clouds , weather, at_all}) =>{
    return <div className = 'city-out'>
        <div className = 'img-view'></div>
        <div className = 'param-container'>
        <p className = 'weather-field'>{weather}</p>
        <p className = 'clouds-field'>{clouds}</p>
        <p className = 'temperature-field'>{temp}</p>
        </div>


        </div>
}




class WeatherPage extends React.Component{
    state = {
        cities: [],
        name: '',
        temp: 0,
        clouds:0,
        weather: '',
        id: -1,
        value: ''
    }
    async fetchCity(lat, lon){
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e6f0053b223eea165cf537c1d26803b3`)
        if(response.status === 200){
            let data = await response.json()
            console.log(data)

            let temp = data.main.temp
            let clouds = data.clouds.all
            let weather = data.weather[0].description
            let id = data.id
            console.log(temp, clouds, weather, id)
            this.setState({temp,clouds, weather, id})
            let cities = []
            cities.push({
                    name: this.state.value,
                    temp: (temp-273.15).toFixed(2) ,
                    clouds: clouds,
                    weather: weather,
                    id: id
            })
            this.setState({cities})
        }
    }
    // GOOGLE API https://maps.googleapis.com/maps/api/geocode/json?address=${ location }&key=AIzaSyDXm7YaG9HZSMxoNKr9OY4h_5h069Lau5A
    async fetchGetID(location){
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ location }&key=AIzaSyDXm7YaG9HZSMxoNKr9OY4h_5h069Lau5A`)
        if(response.status === 200){
            let data = await response.json()
            console.log(data)
            let lat = data.results[0].geometry.location.lat
            let lon= data.results[0].geometry.location.lng
            console.log(lat, lon)
            this.fetchCity(lat, lon)
        }
    }
    componentDidMount(){
        // this.fetchData()
        // this.fetchCity()
        //this.fetchGetID('Naberezhnyye Chelny')
        
    }
    render(){
        return<div className = 'main'>
        <div className = 'input-bar'><input className = 'input-bar__in'
        value={this.state.value} 
        type = 'text'
        onChange={e => {
            this.setState({ value: e.target.value })
        }}
        onKeyDown={e =>{
            if ((e.key === 'Enter' || e.keyCode === 13) && (this.state.value !== '')) {
                this.fetchGetID(this.state.value)
            }
        }
        
        }/></div>
        <div className = 'cities-result'>{this.state.cities.map(city =>{
            return <CurrentCity key={city.id} name = {city.name} temp={city.temp} clouds={city.clouds} weather={city.weather}/>
        })}
        </div>
        </div>
    }
}
export default WeatherPage
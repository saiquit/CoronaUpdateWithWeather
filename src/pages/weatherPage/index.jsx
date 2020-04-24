import React from "react";
import Weather from "../../components/weather_out";
import Spinner from "../../components/loading/Loading";
import axios from "axios";
import Input from "../../components/Input/Input";

class WeatherPage extends React.Component {
  state = {
    current: {
      main: undefined,
      weather: undefined,
      wind: undefined,
      name: "",
      sys: "",
    },
    query: "",
    location: "",
    corona: null,
    error: "",
  };

  componentDidMount() {
    const getLocationOnLoad = async () => {
      await navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3513c89650a8248b1eb502c60b7f542e`;
        await axios.get(url).then((res) => {
          const currentData = res.data;
          this.setState({
            current: {
              main: currentData.main,
              weather: currentData.weather,
              wind: currentData.wind,
              name: currentData.name,
              sys: currentData.sys,
            },
          });
        });
      });
      await axios
        .get(
          `http://api.ipstack.com/check?access_key=85514d9ae9cca761c588f9a0ba1fa1d7`,
        )
        .then(async (res) => {
          let currentLoc = res.data;
          await this.setState({
            location: currentLoc.country_name.toLowerCase(),
          });
        });
      await axios
        .get(
          `https://api.covid19api.com/total/dayone/country/${this.state.location}`,
        )
        .then(async (res) => {
          let currentLocCor = res.data;
          await this.setState({
            corona: currentLocCor,
          });
        });
    };
    getLocationOnLoad();
  }

  queryData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=3513c89650a8248b1eb502c60b7f542e`,
      )
      .then((res) => {
        const currentData = res.data;
        this.setState({
          current: {
            main: currentData.main,
            weather: currentData.weather,
            wind: currentData.wind,
            name: currentData.name,
            sys: currentData.sys,
          },
        });
      });
    axios
      .get(
        `https://api.covid19api.com/total/dayone/country/${this.state.query}`,
      )
      .then((res) => {
        try {
          const newData = res.data;
          this.setState({
            corona: newData,
          });
        } catch (error) {
          this.setState({
            error: `${error} "No Country Found"`,
          });
        }
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.queryData();
    this.setState({
      query: "",
    });
  };
  postData = () => {
    if (this.state.corona) {
      return (
        <div>
          <>
            <form onSubmit={this.handleSubmit}>
              <Input
                value={this.state.query}
                handleChange={(e) => {
                  this.setState({
                    query: e.target.value,
                  });
                }}
              />{" "}
            </form>
            <Weather
              current={this.state.current}
              corona={this.state.corona}
              error={this.state.error}
            />
          </>
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

  render() {
    return <>{this.postData()}</>;
  }
}

export default WeatherPage;

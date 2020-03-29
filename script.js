$(document).ready(function() {
  var results = $(".weatherDisplay");
  var fiveDayForcast = $(".forcastDisplay");
  var forcast1 = $(".forcast");
  var searchBtn = $("#submitBtn");

  $(searchBtn).on("click", function() {
    event.preventDefault();
    alert("clicked");
    $(".weatherDisplay").empty();
    $(".forcastDisplay").empty();
    $(".forcast").empty();
    var city = $("#search").val();

    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial" +
      "&appid=8b1c21c561199e3b898e21eafd5065c0";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.city.name);
      var cityDiv = $(`<div class="weather">`);
      var cityName = $("<h2>").text(response.city.name);
      var date = $("<h2>").text(moment().format("l"));
      var temp = $("<p>").text(response.list[0].main.temp);
      var humidity = $("<p>").text(response.list[0].main.humidity);
      var wind = $("<p>").text(response.list[0].wind.speed);
      //5 days forcast
      var forcast = $(`<div class="forcast">`);

      cityDiv.append(cityName, date);
      //get icon for weather conditions
      var iconURL =
        "https://openweathermap.org/img/wn/" +
        response.list[0].weather[0].icon +
        "@2x.png";

      var imgDiv = $("<div>")
        .attr("class", "col-md-4")
        .append(
          $("<img>")
            .attr("src", iconURL)
            .attr("class", "card-img")
        );
      cityDiv.append(imgDiv);
      cityDiv.append("<strong>Temperature: </strong>", temp, " F <br/>");
      cityDiv.append("<strong>Humidity: </strong>", humidity, " % <br/>");
      cityDiv.append("<strong>Wind Speed: </strong>", wind, " MPH <br/>");
      //
      fiveDayForcast.append("<strong>5-Day forcast: </br></strong>");
      results.append(cityDiv);
      forcast1.append(forcast);
      //five days forcast
      for (i = 5; i <= 40; ) {
        var forcast = $(`<div class="forcast mr-3 my-5">`);
        var cardHead = $("<div>").text(
          moment(response.list[i].dt, "X").format("MMM Do")
        );
        forcast.append(cardHead);
        var temp = $("<p>").text(response.list[i].main.temp);
        var humidity = $("<p>").text(response.list[0].main.humidity);
        var cardImg = $("<img>")
          .attr("class", "card-img-top")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png"
          );
        forcast.append(cardImg);
        forcast.append("<strong>Temp: </strong>", temp, " F <br/>");
        forcast.append("<strong>Humidity: </strong>", humidity, " % <br/>");

        //

        forcast1.append(forcast);
        i = i + 8;
      }
    });
    // $("#searchDisplay").text(city);

    //clear the input text
    $("input:text").focus(function() {
      $(this).val("");
    });
    //list all the search city
    $("#searchDisplay").append(
      $("<li>", {
        text: $("#search").val()
      })
    );
  });
});

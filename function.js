const axios = require("axios").default;

function main(params) {
  const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
  var searchUrl = `${baseUrl}?size=5&apikey=${params.TM_APIKEY}&classificationName=music`;
  if (params.keyword) {
    searchUrl += `&keyword=${params.keyword}`;
  }
  if (params.city) {
    searchUrl += `&city=${params.city}`;
  }
  if (params.state) {
    searchUrl += `&stateCode=${params.state}`;
  }

  return axios
    .get(searchUrl)
    .then(function (res) {
      var resData = 'Nothing found';
      if (res.data.page.totalElements !== 0) {
        if (res.data._embedded !== undefined) {
          resData = '';
          res.data._embedded.events.forEach(function (item) {
            resData += `${item.name}\nDate: ${item.dates.start.localDate} Time: ${item.dates.start.localTime}\nURL: ${item.url}\n\n\t`;
          });
        }
      }
      return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { data: resData },
      };
    })
    .catch(function (err) {
      console.error(err);
      return {
        status: 500,
        headers: { "Content-Type": "application/json" },
        body: { error: err },
      };
    });
}

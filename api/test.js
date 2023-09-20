const axios = require("axios");
/* const { country } = require("../db"); */

const getAccessApi = async (req, res) => {
  try {
    const apiUrl = "https://www.universal-tutorial.com/api/getaccesstoken";
    const headers = {
      Accept: "application/json",
      "api-token":
        "URR_ayVjby0__qE32q-BNRi-jt6hwEPKwTM-VuE0iG1lwQ0PGpRo8YPEjEmc_kacHfU",
      "user-email": "caravanasocial.dev@gmail.com",
    };

    const apiResponse = await axios.get(apiUrl, { headers });
    const accessToken = apiResponse.data.auth_token;

    const countriesApiUrl = "https://www.universal-tutorial.com/api/countries/";
    const countryHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };

    const responseAllCountries = await axios.get(countriesApiUrl, {
      headers: countryHeaders,
    });

    const countryNames = await responseAllCountries.data.map(
      (country) => country.country_name
    );

    let arr = []
    for(let j = 0; j<countryNames.length; j++){
        const state = (await axios.get(
            `https://www.universal-tutorial.com/api/states/${countryNames[i]}`,
            {
              headers: countryHeaders,
            }
          )).data;
        var finalStates = state.map(x=>x.state_name)

        arr.push({[countryNames[i]]: finalStates})
    }
    console.log("ARRRRRR: ",arr)

    for (let i = 0; i < countryNames.length; i++) {
      const state = await axios.get(
        `https://www.universal-tutorial.com/api/states/${countryNames[i]}`,
        {
          headers: countryHeaders,
        }
      );
    }

    const bulkCreateData = countryNames.map((countryName) => ({
      nameCountry: countryName,
    }));

    const result = await country.bulkCreate(bulkCreateData);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("error");
  }
};

module.exports = {
  getAccessApi,
};
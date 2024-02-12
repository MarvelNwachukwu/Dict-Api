/*jshint esversion: 6 */
$(document).ready(function () {
  const form = $('form');
  const input = $('input');
  const resultPage = $('.result_pg');
  const resultContainer = $('.popResult');
  const cardContent = $('.details');

  form.on('submit', (e) => {
    e.preventDefault();
    const inputValue = $('input')[0].value;
    runAPI(inputValue);
  });

  const runAPI = (value) => {
    // let exsitingElemLen = $('.testing').length;
    // if (exsitingElemLen > 0) {
    //   cardContent.empty();
    // }
    cardContent.empty();
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${value}`,
      method: 'GET',
      headers: {
        'x-rapidapi-key': '567b48ddabmsh090783c4ca6cc27p10b590jsn8e191f23aba6',
        'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      },
    };

    $.ajax(settings).done(function (response) {
      let definations = Object.values(response.meaning);
      let partOfSpeech = Object.entries(response.meaning);

      // Print User Query Name
      displayPG();

      partOfSpeech.forEach((element) => {
        if (element[1].length > 0) {
          printResult(element[1], element[0], response.response.toUpperCase());
        }
      });

      const appendqueryName = () => {};
    });

    $.ajax(settings).fail(function (err) {
      console.log(err);
    });

    // End of ajax call
    const displayPG = () => {
      resultContainer.height('fit-content');
      resultPage.height('max-content');
      resultPage.show();
    };
    const printResult = (def, pOS, query) => {
      cardContent.append(
        `
          <h3>${pOS}</h3>
          <p>${def}</p>
        `
      );
      // console.log(resultContainer[0].childNodes.length);
    };
  };
});

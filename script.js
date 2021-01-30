$(document).ready(function () {
  const form = $('form');
  const input = $('input');
  const resultPage = $('.result_pg');
  const resultContainer = $('.popResult');
  const queryName = $('#queryName');

  const clearPreviousResult = () => {
    if (resultContainer[0].lastElementChild.childNodes.length < 4) {
      return;
    } else {
      console.log('div');
      resultContainer.remove('div');
    }
  };

  form.on('submit', (e) => {
    e.preventDefault();
    const inputValue = $('input')[0].value;
    runAPI(inputValue);
  });

  const runAPI = (value) => {
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
      // console.log(response.meaning);
      let definations = Object.values(response.meaning);
      let partOfSpeech = Object.entries(response.meaning);

      // console.log(partOfSpeech[0]);

      // Print User Query Name
      queryName[0].innerHTML = response.response.toUpperCase();
      displayPG();
      // definations.forEach((element) => {
      // console.log(element[0]);
      // printResult(element, element[0]);
      // });
      partOfSpeech.forEach((element) => {
        console.log(element[0]);
        printResult(element[1], element[0]);
      });
    });
    // End of ajax call
    const displayPG = () => {
      clearPreviousResult();
      resultContainer.height('fit-content');
      resultPage.height('max-content');
      resultPage.show();
    };
    const printResult = (def, pOS) => {
      resultContainer.append(
        `
        <div>
          <h3>${pOS}</h3>
          <p>${def}</p>
        </div>
        `
      );

      console.log(resultContainer[0].childNodes.length);
    };
  };
});

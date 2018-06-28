module.exports = function CheckThemDriver(NightmareModule){
  let driver = {};

  driver.enabled = true;
  driver.options = {};
  driver.options.captcha = true;
  driver.options.hasGETSearchURL = true;
  driver.options.fakeSearchPage = true;

  driver.urls = {};
  driver.urls.searchPage = "www.checkthem.com/";
  driver.urls.getSearchURL = function(person){
    return `https://www.checkthem.com/app/search-results-v3?firstname=${person.firstName}&lastname=${person.lastName}&state=00`;
  };

  driver.selectors = {};
  driver.selectors.searchForm = `#homepage_hero_form`;
  driver.selectors.searchFormFirstName = `.homepage_hero_search_box [name='q']`;
  driver.selectors.searchFormLastName = driver.selectors.searchFormFirstName;
  driver.selectors.searchFormButton = `#search`;
  driver.selectors.waitAfterSearch = ".results-table";
  driver.selectors.eachProfileOnSearchPage = `#resultRows .mobile-results-rows`;
  driver.selectors.eachProfileSynopsisLocation = 'td:nth-child(3)';
  driver.selectors.eachProfileSynopsisAge = '.age strong';
  //driver.selectors.nextSearchPage = '.pagination .pagination_item:last-child';
  driver.selectors.alternate = {};
  driver.selectors.alternate.eachProfileOnSearchPage = '.listview_section';

  driver.funcs = {};

  NightmareModule.functionCreator(driver.funcs, 'eachProfileLocation', ['profileDom'], 'location',`
    let link = profileDom.find("a").attr('onclick');
    let index = link.replace(/\\D/g, "");
    let result = $scope.results[index];
    let locations = result.addresses;
    let _locations = [];
    for(let loc of locations){
      _locations.push(loc.city + ", " + loc.state);
    }
    return _locations;
  `);

  NightmareModule.functionCreator(driver.funcs, 'eachProfileLocation', ['profileDom'], 'name',`
    let name = profileDom.find('.name').text().trim();
    return name;
  `);

  NightmareModule.functionCreator(driver.funcs, 'eachProfileID', ['profileDom'], 'id', `
    let link = profileDom.find("a").attr('onclick');
    let index = link.replace(/\\D/g, "");
    let result = $scope.results[index];
    console.log(link, index, result);
    return result.token;
  `);

  NightmareModule.functionCreator(driver.funcs, 'api', ['profileDom'], null, `
    let link = profileDom.find("a").attr('onclick');
    let index = link.replace(/\\D/g, "");
    let result = $scope.results[index];
    return result
  `);


  
  return driver;
};